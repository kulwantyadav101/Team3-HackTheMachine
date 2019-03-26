# Hack The Machine 2019

## Team Members

- [Sachin Gupta](https://github.com/sachin303)
- [Ankit Shah](https://github.com/ankitshahas)
- [Kulwant Yadav](https://github.com/kulwantyadav101)
- [Sonali Chawla](https://github.com/sonalichawla16)
- [Shivam Rastogi](https://github.com/shivamras304)

## Project Setup - Local

Please follow the following steps to setup the project on your local machine

### Eslint setup

Please install [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VS Code.
A .eslintrc is already provided in the project repo so just add the following settings to your settings.json file in VS Code.

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
### Refer this https://www.npmjs.com/package/alexa-skill-local for usage #####

npm install
npm install -g alexa-skill-local
```



