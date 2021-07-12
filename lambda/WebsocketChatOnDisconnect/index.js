const AWS = require('aws-sdk');
const DDB = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: 'eu-central-1' });

exports.handler = async event => {
  const parameters = {
    TableName: 'ws_connections',
    Key: {
      connection_id: event.requestContext.connectionId
    }
  };
  try {
    await DDB.delete(parameters).promise();
  } catch (err) {
    return { statusCode: 500, body: 'An error occured while disconnnecting: ' + JSON.stringify(err) };
  }
  return { statusCode: 200, body: 'Disconnected successfully.' };
};
