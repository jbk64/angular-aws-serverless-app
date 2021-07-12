const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  console.log(event)
  console.log(context)
  const parameters = {
    TableName: 'ws_connections',
    Item: {
      connection_id: event.requestContext.connectionId,
      username: null
    }
  };

  try {
    await DDB.put(parameters).promise();
  } catch (err) {
    return { statusCode: 500, body: 'En error occured while connecting: ' + JSON.stringify(err) };
  }
  return { statusCode: 200, body: 'Successfully connected.' };
};
