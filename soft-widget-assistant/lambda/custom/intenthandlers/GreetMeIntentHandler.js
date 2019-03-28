const {
  APP_NAME,
  FULL_NAME_PERMISSION
} = require('../utils/constants')

const messages = require('../utils/messages')
const dbHelper = require('../helpers/dbHelper');

const GreetMeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GreetMeIntent';
  },
  async handle(handlerInput) {
    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
      const profileName = await upsServiceClient.getProfileName();
	  const profileId = handlerInput.requestEnvelope.context.System.user.userId;
      const speechResponse = `Hello, ${profileName}, you are a registered customer now`;
	  
	  return dbHelper.getCustomer(profileId)
      .then((data) => {
		  if (data.length == 0) {
			  
			  return dbHelper.addCustomer(profileName, profileId)
				  .then((data) => {
					//const speechText = `You have added movie ${movieName}. You can say add to add another one or remove to remove movie`;
					return responseBuilder
								  .speak(speechResponse)
								  .withSimpleCard(APP_NAME, speechResponse)
								  .getResponse();
				  })
				  .catch((err) => {
					console.log("Error occured while saving customer", err);
					const speechText = "we cannot save customer right now. Try again!"
					return responseBuilder
					  .speak(speechText)
					  .getResponse();
				  })
			  
		  }else{
			  const cust_name= data.map(e => e.name);
			  return responseBuilder
								  .speak(`Welcome back ${cust_name}.`)
								  .withSimpleCard(APP_NAME, speechResponse)
								  .getResponse();
			  
		  }
	  }).catch((err) => {
        const speechText = "we cannot get customer right now. Try again!"
        return responseBuilder
          .speak(speechText)
          .getResponse();
      })
	  
	  
	  
      
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

module.exports = GreetMeIntentHandler;