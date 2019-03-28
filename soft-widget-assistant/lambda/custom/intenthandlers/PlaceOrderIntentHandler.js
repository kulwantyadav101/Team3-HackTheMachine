const {
  APP_NAME,
  FULL_NAME_PERMISSION
} = require('../utils/constants')

const messages = require('../utils/messages')
const db = require('../db')

const PlaceOrderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'PlaceOrderIntent';
  },
  async handle(handlerInput) {
    return responseBuilder.speak('Order succesful')
    .withSimpleCard(APP_NAME, 'Order succesful')
    .getResponse();

    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
      const profileName = await upsServiceClient.getProfileName();
      const profileEmail = await upsServiceClient.getProfileEmail();
      if (!profileEmail) {
        const noEmailResponse = `It looks like you don\'t have an email set. You can set your email from the companion app.`
        return responseBuilder
                      .speak(noEmailResponse)
                      .withSimpleCard(APP_NAME, noEmailResponse)
                      .getResponse();
      }

      // place an order
      db.get('orders')
        .push({
          email: phoneEmail,
          name: profileName,
          date: new Date()
        })

      const speechResponse = 'Your order has been placed successfully'
      
      return responseBuilder
                      .speak(speechResponse)
                      .withSimpleCard(APP_NAME, speechResponse)
                      .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode == 403) {
        return responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard([FULL_NAME_PERMISSION])
        .getResponse();
      }
      console.log(JSON.stringify(error));
      const response = responseBuilder.speak(messages.ERROR).getResponse();
      return response;
    }
  },
}

module.exports = PlaceOrderIntentHandler;