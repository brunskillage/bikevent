# Bikevent

An app to help coordinate motorcycle rides and events.

## Basic concept

 - Coordinators of clubs create rides and events
 - They can optionally link branches to get a view of their events
 - Members and subscribe to club linked events or their own
 - Calendar feed available for events and rides
 - View Latest Rides close to them

## Setup

Working on it!

### Prerequisites

 - Clone the repo
 - .net core capable editing program
 - 


### Application Components
App Design

- React front end (Javascript One page app framework)
- Makes calls to .net core backend (C# Asp.net core) Rest API
- Database (currently Maria db)
 - Structure is managed using fluent migrator package
 - Test data is added via console runner command line you can uncomment the following lines to add test data

### Running the Application

Note: this was published via VS to a linux box running .net core so some of the values relate to changing th paths appropriately.

  - clone this repo
  - in docs folder
    - copy .env in src\Bikevent.Client\reactclient\.env
    - copy appSettings.json to src\Bikevent.Website and add you values
    - use usersecrets functionality if desired
    - Populate with your values.
  - create your database and make sure user has permissions using values in appsettings above
  - you can test website host API  by starting src\Bikevent.Website (set as startup) which will fail if DB Connection or settings wrong
  - for the react client go to src\Bikevent.Client\reactclient and 
  - run
  ```
   npm install
   npm run dev
  ```



