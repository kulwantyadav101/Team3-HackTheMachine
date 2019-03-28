const db = require('../db')

const EditOrderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'EditOrderIntent';
  },
  handle(handlerInput) {

    const { responseBuilder } = handlerInput;
    const userID = handlerInput.requestEnvelope.context.System.user.userId; 
    let editOrderResponse = ''

    return db.getOrder(userID)
      .then((data) => {
        if (data.length == 0) {
          editOrderResponse = `
            There is no existing order to modify.
          `
        } else {
          editOrderResponse = `
            We do not yet support modifying orders once they have been placed. Please cancel your existing
            order and place a new order if necessary.
          `
        }
        return responseBuilder
          .speak(editOrderResponse)
          .reprompt(editOrderResponse)
          .getResponse();
      })
      .catch((err) => {
        console.log("Error occured while deleting order", err);
        editOrderResponse = "There is no existing order to modify."
        return responseBuilder
          .speak(editOrderResponse)
          .reprompt(editOrderResponse)
          .getResponse();
      })
  },
}

module.exports = EditOrderIntentHandler;