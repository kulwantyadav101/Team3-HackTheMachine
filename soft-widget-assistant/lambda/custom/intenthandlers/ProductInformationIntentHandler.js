const {
  APP_NAME
} = require('../utils/constants')

const ProductInformationIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'ProductInformationIntent');
    },
    handle(handlerInput) {
      const speechText = `
        Widget Pro a revolutionary house-hold product everyone wants. 
        It features a sleek casing with intuitive features. Features include.
        Rock-solid audio engagement.
        Silver-bullet touch response system.
        Long lasting rechargeable battery.
      `;
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(APP_NAME, speechText)
        .getResponse();
    },
  };
  
  module.exports = ProductInformationIntentHandler;