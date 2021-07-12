'use strict';

var AWS = require('aws-sdk');

var dynamo = new AWS.DynamoDB();

exports.handler = async(event, context, callback) => {

  const { id } = event.pathParameters

  try {
    const data = await dynamo.query({
      TableName: "messages",
      ProjectionExpression: '#T, sender, content',
      ExpressionAttributeNames: { '#T': 'timestamp' },
      KeyConditionExpression: 'conversation_id = :id',
      ExpressionAttributeValues: { ':id': { S: id } }
    }).promise()

    const messages = data.Items.map(i => {
      return {
        timestamp: i.timestamp.S,
        sender: i.sender.S,
        content: i.content.S,
      }
    })

    callback(null, {
      statusCode: '200',
      body: JSON.stringify(messages),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })

  } catch (error) {
    console.log(error)
    callback(null, {
      statusCode: '400',
      body: JSON.stringify(error),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
};
