const {
  APP_NAME,
  MOBILE_PERMISSION
} = require('../utils/constants')

const messages = require('../utils/messages')

const MobileIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MobileIntent';
  },
  async handle(handlerInput) {
    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
      const profileMobileObject = await upsServiceClient.getProfileMobileNumber();
      if (!profileMobileObject) {
        const errorResponse = `It looks like you don\'t have a mobile number set. You can set your mobile number from the companion app.`
        return responseBuilder
                      .speak(errorResponse)
                      .withSimpleCard(APP_NAME, errorResponse)
                      .getResponse();
      }
      const profileMobile = profileMobileObject.phoneNumber;
      const speechResponse = `Hello your mobile number is, <say-as interpret-as="telephone">${profileMobile}</say-as>`;
      const cardResponse = `Hello your mobile number is, ${profileMobile}`
      return responseBuilder
                      .speak(speechResponse)
                      .withSimpleCard(APP_NAME, cardResponse)
                      .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode == 403) {
        return responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard([MOBILE_PERMISSION])
        .getResponse();
      }
      console.log(JSON.stringify(error));
      const response = responseBuilder.speak(messages.ERROR).getResponse();
      return response;
    }
  },
}

module.exports = MobileIntentHandler;