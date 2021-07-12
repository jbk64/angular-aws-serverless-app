const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB()

exports.handler = async(event, context) => {
  // Configurer ApiGatewayManagementApi
  const apiGateway = new AWS.ApiGatewayManagementApi({
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage

  })

  // Extraire les données de la requête Websocket
  const { content, sender, conversation_id } = JSON.parse(event.body)

  // Enregistrer message
  const timestamp = Date.now().toString()
  const params = {
    TableName: "messages",
    Item: {
      sender: {
        S: sender
      },
      timestamp: {
        S: timestamp
      },
      conversation_id: {
        S: conversation_id
      },
      content: {
        S: content
      }
    }
  }
  await dynamo.putItem(params).promise()

  // Récupérer le nom du destinataire à qui envoyer le message
  const conversations = await dynamo.query({
    TableName: 'conversations',
    ProjectionExpression: 'username',
    KeyConditionExpression: 'conversation_id = :id',
    ExpressionAttributeValues: { ':id': { S: conversation_id } }
  }).promise()

  const usernames = conversations.Items.map(i => i.username.S)
  const participants = usernames.filter(u => u !== sender)
  const targetUser = participants[0]

  // Récupérer les connections auxquelles envoyer le message avec via le nom d'utilisateur
  const connections = await dynamo.scan({
    TableName: 'ws_connections',
    FilterExpression: 'username = :username OR username = :sender',
    ExpressionAttributeValues: {
      ":username": {
        S: targetUser
      },
      ":sender": {
        S: sender
      }
    }
  }).promise()
  const connectionIds = connections.Items.map(c => c.connection_id.S)
  console.log(connectionIds)

  // Envoyer le message à chaque connection
  const promises = connectionIds.map(connectionId => apiGateway.postToConnection({
    ConnectionId: connectionId,
    Data: JSON.stringify({ content, sender, timestamp })
  }).promise())
  await Promise.all(promises)
  return {
    statusCode: '200'
  }
};
