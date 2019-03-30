const {
  APP_NAME
} = require('../utils/constants')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },

  async handle(handlerInput) {

    const speechText = `
    Thank you for choosing Soft Widget. We are leader in house-hold consumer product and ranked 
    first in consumer satisfaction for the last three years. We are offering our signature product "Widget Pro" through Alexa.
    You can ask me more about "Widget Pro", place an order or manage your existing order.
    `;
    const reprompt = `
      You can ask me more about "Widget Pro", place an order or manage your existing order.
    `;

    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
      const profileName = await upsServiceClient.getProfileName();
      const greetings = `Hello ${profileName.split(' ')[0]}. `;
      return responseBuilder
        .speak(greetings + speechText)
        .reprompt(reprompt)
        .withSimpleCard(APP_NAME, greetings + speechText)
        .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode == 403) {
        // Permissions are missing, so skip the greeting
        return responseBuilder
          .speak(speechText)
          .reprompt(reprompt)
          .withSimpleCard(APP_NAME, speechText)
          .getResponse();
      }
      const response = responseBuilder.speak(messages.ERROR).getResponse();
      return response;
    }
  },
};

module.exports = LaunchRequestHandler;