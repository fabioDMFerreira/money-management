# Loli Store Frontend

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You will find information on how to perform common tasks on this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Folder Structure

- assets
- components - contains components used in more than one scene and components that don't fit in any scene like App and Header.
- locale - constants that identify strings and locale strings files.
- localstorage - constains constants that identify properties that can be saved in localstorage.
- propTypes - contains propTypes definitions used in more that one component
- scenes - contains pages and their own components
- services - constains all services. Most of them are used as the layer that connects with server.
- store - contains all logic related with Redux state.
  - /*/actions - contains action creators
  - /*/types - contains types used in action creators and reducer
  - /*/thunks - contains operations related with asyncronous chages of state like getting data from server
  - /*/reducer - contains reducer, the function that changes state. The rootReducer uses reducers of other modules like authentication, localize, rent and shopping cart.

### Container Pattern

Most of the components are separated in a `UI component` and in a `Container component`. The `Container component` exports the associated `UI component`, adding to it state values and actions that change the state through props. The distinction of the two types of components are visible by its name. i.e. ShoppingCartAddProduct.js is UI component and ShoppingCartAddProductContainer.js is its container component.

## Configuration

Configuration properties are defined in root files .env.{environment}, where environment can be `production` or `development`.

Variables of `development` are used on `npm start`.<br />
Variables of `production` are used on `npm run-script build`.

All variables must start with `REACT_APP_`, so `create-react-app` can inject them in project.

## Getting started

Install dependencies and run server.

```
> npm install
> npm start
```

## Deploy

Generate bundle of application minified and run static server with bundle generated.

```
> npm run-script build
> npm install -g serve 
> serve -s build
```

`Warning: Verify before deploying if build application has the last updates. If not, clean directory before running build script.`

The content of build directory shall be used in production.

At this moment the staging server is 13.73.138.41 and the content of build directory should be past to C:\ProgramData\LOLI\loli-store.

Command tool scp provides a way to upload content of build to staging server directory.
```
> scp -r ./build/* inspireit@13.73.138.41:C:\\ProgramData\\LOLI\\loli-store
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Localisation
Once Loli Store has to support other languages, raw strings shouldn't be used in application.

All strings should be represented by a constant that exists in `locale/consts` file. This constant represents the id of the string that shall be used with `Translate` component. Strings translated are in a file into `locale` directory with the code name that represents a language. Translations are initialized in state on `store/localize/init`. 

### Usage

Next example shows how to add a string into the project and use it in a component.

`locale/consts.js`
```
export default {
  LOLI_STORE:'LOLI_STORE'
}
```
<br />

`locale/en.js`
```
import {LOLI_STORE} from "locale/consts"

export default {
  [LOLI_STORE]:'Loli Store'
}
```
<br />

`components/ApplicationTitle.js`
```
import Translate from 'components/Translate';
import {LOLI_STORE} from 'locale/consts';

const ApplicationTitle = ()=><Translate id={LOLI_STORE} />

export default ApplicationTitle;
```