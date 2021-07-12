const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB()
const {uuid} = require('uuidv4')

exports.handler = async (event) => {
  const conversationId = uuid()
  const data = await dynamo.transactWriteItems({
    TransactItems: [{
      Put: {
        TableName: 'conversations',
        Item: {
          conversation_id: {
            S: conversationId
          },
          username: {
            S: event.user1
          }
        }
      }
    },
      {
        Put: {
          TableName: 'conversations',
          Item: {
            conversation_id: {
              S: conversationId
            },
            username: {
              S: event.user2
            }
          }
        }
      }
    ]
  }).promise()
  return data
}
