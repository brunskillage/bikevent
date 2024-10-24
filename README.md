# Bikevent

An app to help coordinate motorcycle rides and events.

## Basic concept

 - Coordinators of clubs create rides and events
 - They can optionally link branches to get a view of their events
 - Members and subscribe to club linked events or their own
 - Calendar feed available for events and rides

## Setup

Working on it!

- app consists of
  -  React front end 
  - .net core backend
  - database (currently Maria db)
- obtaining and building code
  - clone this repo
  - in docs folder
  - using .env.template 
  - create .env in src\Bikevent.Client\reactclient\.env
  - using appSettings.json
  - Go to src\Bikevent.Website project right click and create usersecrets.json 
  - use the structure and populate with your values.
  - create your database and make sure user has permissions
  - you can test website host API  by starting src\Bikevent.Website (set as startup) which will fail if DB Connection or settings wrong
  - for the react client go to src\Bikevent.Client\reactclient and 
  - run
  ```
   npm install
   npm run dev
  ```

- Developing
  - Start the website
  - start the reactClient - make changes as necessary


