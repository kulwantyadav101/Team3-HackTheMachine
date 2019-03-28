const Alexa = require('ask-sdk');
const { TABLE_NAME } = require('./utils/constants')

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

const skillBuilder = Alexa.SkillBuilders.standard();

console.log(TABLE_NAME)

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    // GreetMeIntentHandler,
    EmailIntentHandler,
    MobileIntentHandler,
    PlaceOrderIntentHandler
  )
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  .withTableName(TABLE_NAME)
  .withAutoCreateTable(true)
  .lambda();
