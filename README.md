
## Setup

Configure a file `.env` in the project root directory:

```
REACT_APP_GITHUB_CLIENT_ID=*** your github oauth2 app's client id ***
REACT_SERVER_GITHUB_SECRET=*** your github oauth2 app's secret ***
REACT_SERVER_PORT=8080
```

Configure the GitHub OAuth2 App's callback URL to be:

```
http://your_host_port/api/oauth/callback
```

When running locally using `yarn start` this should be:

```
http://localhost:3000/api/oauth/callback
```

## Running

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
