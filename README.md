# Bus Stop Test - Richard Jenkins

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Overview

This application uses both REST API endpoints for initial load of buses arrival and signalR for updaing predictions

### Issues

#### returned properties with different casing

The json returned from the REST API is in lower camelCase but from the sugnalR they are upper CamelCase. In the application I have converted the case of the json returned to upper CamelCase to make the display of these values easier

### Features

#### list initialisation

To give the user the quickest view of bus arrivals the REST API calls are made to imediately fill the list with the latest predictions.

#### signalR

The list is update with predictions via signalR.

For the signalR I have used the code demonstrated in the TfL documents, this required me to wrap this in a component so that React Hooks could be used. I think there is a better solution but most examples I found required some work to work with the TfL library so I stuck to what I knew worked. This is in *SignalRConnector.js*

#### Other stuff

Used a Clock component as separate component to stop whole page rendering every tick

Used a Shaker component to highlight the times changed on update (sometimes this shakes but the time doesn't change this is because the time is predicted in seconds but I am showing minutes)

Implemented Filters for both Routes and Stops

Implemented Grouping by Stops

Implemented removal of dead Records after time to live expired 

Added Linting

## To start the app

In the project directory, run the following to install the npm modules:

### `npm i`

In the project directory, run the following to start the application:

### `npm start`

The application will be available at http://localhost:3000 
