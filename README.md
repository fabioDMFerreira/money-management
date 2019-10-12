# Money Management
Save, label and organise your transactions. Add your estimations to plan your financial life.

# Features

- Displays **transaction history**.
- **Imports** transactions from **csv file**.
  - Map headers fields to application transaction structure.
- Calculate **balance** of transactions history on a line chart and a table.
- Add wallets and assign transactions to wallets.
- Add tags to transactions.
- Display transactions values by tag.

# Folder Structure

- **models** - types, classes and interfaces.
- **state** - redux code. It uses ducks architecture.
- **views** - react components.
  - **components** - shared components.
  - **hocs** - enhanced components.
  - **layout** - page structure components like navigation bar and header.
  - **pages** - application pages.

# Configuration

Environment variables are defined in .env.{environment} files. Examples of environment values are `production` and `development`.

All variables must start with `REACT_APP_`, so `create-react-app` can inject them in project.

# Getting started

Install dependencies and run server.

```
> npm install
> npm start
```

Or use docker

```
> docker-compose up
```

# Deploy

Generate bundle of application minified and run static server with bundle generated.

```
> npm run-script build
> npm install -g serve
> serve -s build
```

`Warning: Verify before deploying if build application has the last updates. If not, clean directory before running build script.`

# Available Scripts

## Start application

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Test

`npm test`

Launches the test runner in the interactive watch mode.<br>
<!-- See the section about [running tests](#running-tests) for more information. -->

## Build

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

# Create React App

Bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Find more information about how to perform common tasks on this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
