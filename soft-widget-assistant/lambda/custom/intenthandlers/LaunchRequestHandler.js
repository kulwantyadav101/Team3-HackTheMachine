const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Hello there. Welcome to Alexa. you can say greet me!';
    const reprompt = 'Say greet me';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(APP_NAME, speechText)
      .getResponse();
  },
};

module.exports = LaunchRequestHandler;