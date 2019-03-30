const {
  APP_NAME
} = require('../utils/constants')

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can ask me more about "Widget Pro", place an order or manage your existing order.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(APP_NAME, speechText)
      .getResponse();
  },
};

module.exports = HelpIntentHandler;
