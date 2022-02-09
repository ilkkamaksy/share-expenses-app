[![CircleCI](https://circleci.com/gh/ilkkamaksy/share-expenses-app/tree/master.svg?style=svg)](https://circleci.com/gh/ilkkamaksy/share-expenses-app/tree/master)
[![codecov](https://codecov.io/gh/ilkkamaksy/share-expenses-app/branch/master/graph/badge.svg)](https://codecov.io/gh/ilkkamaksy/share-expenses-app)

# Track Shared Expenses Application

Keep track of shared expenses with your friends and family. Create groups, add names people and start adding expenses with the amount paid and how much each person contributed. The app will keep track of everything for you, so you don't have to. Invite friends to manage the group with you.

## Project in expo

Start up the app with your expo client on [the project's expo page](https://expo.io/@ilkkamakinen/share-expenses-app).

## Installation

- For backend, go to `backend/`
- run `npm install`
- For frontend, go to `react-native-frontend/`
- run `npm install`

Setup the following required environment variables in a file named `.env` 

- `MONGODB_URI = "your-production-mongodb-uri"`
- `DEV_MONGODB_URI = "your-development-mongodb-uri"`
- `TEST_MONGODB_URI = "your-testing-mongodb-uri"`
- `PORT = "port-number"`
- `JWT_SECRET = "your-secret-here"`

## Running the app

You can run the app in production or development mode.

### Development mode

- Start up the backend in folder `backend/` by running `npm run dev`
- Start up the frontend in folder `react-native-frontend/` by running `npm run dev`

### Production mode

- Start up the backend in folder `backend/` by running `npm run start`
- Start up the frontend in folder `react-native-frontend/` by running `npm run start`

## Running tests

- Run backend tests in folder `backend/` by running `npm run test`
- Run frontend tests in folder `react-native-frontend/` by running `npm run test`
