const HelloWorldIntentHandler = require('./HelloWorldIntentHandler');
const HelpIntentHandler = require('./HelpIntentHandler');
const SessionEndedIntentHandler = require('./SessionEndedIntentHandler');
const CancelAndStopIntentHandler = require('./CancelAndStopIntentHandler');

module.exports = [
  HelloWorldIntentHandler,
  HelpIntentHandler,
  SessionEndedIntentHandler,
  CancelAndStopIntentHandler,
];
