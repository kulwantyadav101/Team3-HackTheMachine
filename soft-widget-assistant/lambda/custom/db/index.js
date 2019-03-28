const AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
const { TABLE_NAME } = require('../utils/constants')

const db = function () { };
const docClient = new AWS.DynamoDB.DocumentClient();

db.prototype.addOrder = (userID, userInfo, shippingAddress) => {
  return new Promise((resolve, reject) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
          'userInfo': userInfo,
          'shippingAddress' : shippingAddress,
          'userId': userID
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.log("Unable to insert =>", JSON.stringify(err))
            return reject("Unable to insert");
        }
        console.log("Saved Data, ", JSON.stringify(data));
        resolve(data);
    });
  });
}

db.prototype.getOrder = (userID) => {
  return new Promise((resolve, reject) => {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#userID = :user_id",
        ExpressionAttributeNames: {
            "#userID": "userId"
        },
        ExpressionAttributeValues: {
            ":user_id": userID
        }
    }
    docClient.query(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return reject(JSON.stringify(err, null, 2))
        } 
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        resolve(data.Items)
    })
  });
}

db.prototype.removeOrder = (userID) => {
  return new Promise((resolve, reject) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            "userId": userID
        },
        ConditionExpression: "attribute_exists(userId)"
    }
    docClient.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            return reject(JSON.stringify(err, null, 2))
        }
        console.log(JSON.stringify(err));
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        resolve()
    })
  });
}

module.exports = new db();