const Alexa = require('ask-sdk');

const {
  LaunchRequestHandler,
  SessionEndedRequestHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  ErrorHandler,
  GreetMeIntentHandler,
  EmailIntentHandler,
  MobileIntentHandler,
  PlaceOrderIntentHandler
} = require('./intenthandlers')

const RequestLog = {
  process(handlerInput) {
    console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
  },
};

const ResponseLog = {
  process(handlerInput) {
    console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput)}`);
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GreetMeIntentHandler,
    EmailIntentHandler,
    MobileIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    PlaceOrderIntentHandler
  )
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
