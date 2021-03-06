# Hack The Machine 2019

## Team Members

- [Sachin Gupta](https://github.com/sachin303)
- [Ankit Shah](https://github.com/ankitshahas)
- [Kulwant Yadav](https://github.com/kulwantyadav101)
- [Sonali Chawla](https://github.com/sonalichawla16)
- [Shivam Rastogi](https://github.com/shivamras304)

## Project Setup

Please follow the following steps to setup the project

### Eslint setup (Only for development)

Please install [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VS Code.
A .eslintrc is already provided in the project repo so just add the following settings to your settings.json file() in VS Code.
You can fin the settings.json file here - 
On Windows/Linux - File > Preferences > Settings
On macOS - Code > Preferences > Settings

```
// These are all my auto-save configs
"editor.formatOnSave": true,
// turn it off for JS and JSX, we will do this via eslint
"[javascript]": {
  "editor.formatOnSave": false
},
"[javascriptreact]": {
  "editor.formatOnSave": false
},
// tell the ESLint plugin to run on save
"eslint.autoFixOnSave": true,
// Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
"prettier.disableLanguages": ["javascript", "javascriptreact"],
```

Please follow this [repo](https://github.com/wesbos/eslint-config-wesbos/) by Wesbos in case of any confusion

### Install dependencies

```
npm install
```

### Install ask-cli

You will need an [Amazon Developer Account](https://developer.amazon.com/) 
and [AWS Credentials](https://developer.amazon.com/docs/smapi/manage-credentials-with-ask-cli.html#create-aws-credentials)
to install ask-cli. Install and initialize ask-cli on your machine using the instructions 
on the [official documentation](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html).

### Deploying the app

Make sure you run the following command in the same directory as the skill.json file
```
cd soft-widget-assistant
ask deploy
```
Easy!

### Setting up database

For a developer build, you also need to configure your DynamoDB on 
AWS console. Follow the following steps:

1. Open the IAM console
2. Go to Roles tab from the sidebar
3. Click on the role name for your app. (Should be ask-lambda-soft-widget-assistant)
4. Click on Attach Policies
5. Filter for DynamoDB Policies
6. For a developer build, we can select AmazonDynamoDBFullAccess policy
7. Click on Attach Policy

Next, you need to create a table named **sw-orders** with primaryKey as **userId**
 on the DynamoDB console 

All done!

Follow the next steps if you're interested in
running unit tests as well.

## Setup and run Unit Test scripts
To get started, you need to install Bespoken Tools, please follow the next steps:
1. Install Bespoken Tools by running `npm install -g bespoken-tools` on your command line.
2. Create the main testing folder. We recommend to name it `test`; it should be under the root of your skill's directory.
3. Create a folder named `unit` under `test\`, this folder will store your unit test script files.  
4. Add the test configuration file `testing.json`. This file should be located under your `test\unit` directory. It might look like this:
    ```JSON
    {
        "handler": "../../src/index.js",
        "locale": "de-DE",
        "trace": true,
        "jest": {
            "silent": false
        }
    }
    ```
    The most important parameter is the handler where you indicate Bespoken's Skill Tester where the source code of your skill is. These parameters can be overwritten on each test script file under their configuration section.
5. Add your test scripts. We recommend to use next convention when naming your test script files:
     * If you have only one test script: `index.test.yml`
     * If you want to create more than one test script: `functionalityName.test.yml`. 

      The yml extension indicates this is a YAML file, which is the syntax we use to create test scripts; `test` means that is a unit test script file. A test script looks like this:
    ```YAML
    ---
    configuration: # Here you define your locales and mocks
        locale: en-US
     --- # Three dashes start a new YAML document
    - test: Launch request, no further interaction. # Some metadata about this test sequence
    - LaunchRequest: # LaunchRequest is not an utterance but a request type and reserved word
        - response.outputSpeech.ssml: Here's your fact
        - response.card.type: Simple
        - response.card.title: Space Facts
        - response.card.content: "*" # Any text will match
    ```
    A typical YAML sentence is composed of 2 parts separated by a colon; in the left part we have the intent name we want to test; in the right part we have the expected result. You can also access any element on the JSON response object like the session attributes.
6. To execute the scripts go to the root of your project and run `bst test`. That will find and run all the unit test scripts files.

 For more information about skill unit testing please read [here](https://read.bespoken.io/unit-testing/getting-started/).
