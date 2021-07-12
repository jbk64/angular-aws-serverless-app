const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB();

exports.handler = async(event, context) => {
  const data = JSON.parse(event.body)
  const { username } = data
  const { connectionId } = event.requestContext
  const params = {
    TableName: 'ws_connections',
    Key: {
      "connection_id": {
        S: connectionId
      }
    },
    UpdateExpression: "SET username = :username",
    ExpressionAttributeValues: {
      ":username": {
        S: username
      }
    }
  }
  try {
    await dynamo.updateItem(params).promise()
  } catch (error) {
    console.error(error)
  }
};
