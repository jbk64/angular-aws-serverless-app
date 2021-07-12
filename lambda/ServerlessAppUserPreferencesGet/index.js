var AWS = require('aws-sdk');

var dynamo = new AWS.DynamoDB();

exports.handler = async(event) => {
  const { username } = event.pathParameters
  const params = {
    TableName: 'users',
    Key: {
      username: {
        "S": username
      }
    },
    AttributesToGet: [
      'bio'
    ]
  }
  try {
    const data = await dynamo.getItem(params).promise()
    const preferences = {
      bio: data.Item.bio.S
    }
    return {
      statusCode: '200',
      body: JSON.stringify(preferences),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  } catch (err) {
    return {
      statusCode: '400',
      body: err,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
};
