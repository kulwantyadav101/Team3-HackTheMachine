const Alexa = require('ask-sdk');
const intentHandlers = require('./intenthandlers');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(...intentHandlers)
  .lambda();
