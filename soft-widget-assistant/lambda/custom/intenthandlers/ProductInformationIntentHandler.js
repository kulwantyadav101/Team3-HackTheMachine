
const ProductInformationIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'ProductInformationIntent');
    },
    async handle(handlerInput) {
      const speechText = `Thank you inquiring about our product . here is the details."Widget Pro" is having Rock-solid audio engagement.  It is having Silver-bullet touch response system.`;
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .withSimpleCard(speechText)
        .getResponse();

        await SVGPathSegClosePath(3000);
    },
  };
  
  module.exports = ProductInformationIntentHandler; 