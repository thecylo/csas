# Csas

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.2.
Before start run `npm install`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Mocks

Run `npm run mock:server` to start json server with mocks. Data can be found in db.json. Server runs at `http://localhost:3000/`.

## Used libraries / frameworks

MindSphere CSS framework for styling with custom colors.
Json Server for mocks.
Jest for executing headless tests and faster.
RXjs for observable pattern.

All of the above are free to use and were chosen by personal preferences (except Rxjs).

## Additional info

Notifications aren't in interceptor because there aren't different status codes for actions.
Dialog and dashboard components doesn't have test because of lack of time (issue with circular strucer which is related to DI of services)
Slow server response handled by timeout, but could be as well handled by cancellable subscription.

There is no 100% test coverage. There wasn't enough time.
