const db = require('../db')

const DeleteOrderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DeleteOrderIntent';
  },
  handle(handlerInput) {

    const { responseBuilder } = handlerInput;
    const userID = handlerInput.requestEnvelope.context.System.user.userId; 

    if (handlerInput.requestEnvelope.request.intent.confirmationStatus === 'DENIED') {
      const response = "The order won't be cancelled"
      return responseBuilder
        .speak(response)
        .getResponse();
    } else if (handlerInput.requestEnvelope.request.intent.confirmationStatus === 'CONFIRMED') {
      return db.removeOrder(userID)
        .then((data) => {
          console.log('Deleted order: ' + data)
          const orderCancelledResponse = 'The order has been cancelled successfully';
          return responseBuilder
            .speak(orderCancelledResponse)
            .getResponse();
        })
        .catch((err) => {
          console.log("Error occured while deleting order", err);
          const orderNotDeletedResponse = "There is no existing order to delete."
          return responseBuilder
            .speak(orderNotDeletedResponse)
            .reprompt(orderNotDeletedResponse)
            .getResponse();
        })
    }
  },
}

module.exports = DeleteOrderIntentHandler;