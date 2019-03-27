const {
  APP_NAME,
  EMAIL_PERMISSION
} = require('../utils/constants')

const messages = require('../utils/messages')

const EmailIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'EmailIntent';
  },
  async handle(handlerInput) {
    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
      const profileEmail = await upsServiceClient.getProfileEmail();
      if (!profileEmail) {
        const noEmailResponse = `It looks like you don\'t have an email set. You can set your email from the companion app.`
        return responseBuilder
                      .speak(noEmailResponse)
                      .withSimpleCard(APP_NAME, noEmailResponse)
                      .getResponse();
      }
      const speechResponse = `Hello your email is, ${profileEmail}`;
      return responseBuilder
                      .speak(speechResponse)
                      .withSimpleCard(APP_NAME, speechResponse)
                      .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode == 403) {
        return responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard([EMAIL_PERMISSION])
        .getResponse();
      }
      console.log(JSON.stringify(error));
      const response = responseBuilder.speak(messages.ERROR).getResponse();
      return response;
    }
  },
}

module.exports = EmailIntentHandler