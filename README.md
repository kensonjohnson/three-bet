# Three Bet Poker

## Description

This is a full stack application that runs a multiplayer server for Texas Hold'em Poker.
The server is built with Node.js and Express.js.
The client is built with vanilla JavaScript and HTML5.

## Installation

1. Clone the repo

   ```sh
   git clone https://github.com/kensonjohnson/three-bet.git
   cd vanilla-js-drag-and-drop
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Run the application

   ```sh
   npm run dev
   ```

4. The backend server will be running on port 3000 and the frontend will be running on port 5173.
   You can access the application at either address.

## Available Scripts

There are a few scripts that can be run from the command line:

### `npm run dev`

Runs the application in development mode.
Both the frontend and backend servers will restart when changes are made to the code.

Its important to note that the frontend will be 'built' and the resulting static files will be served from the backend server.
This is done to emulate the production environment.

The backend server is running on port 3000 and the frontend is running on port 5173.
This means that as you change frontend code, you will see changes on 5173.
However, you will **_not_** see changes on 3000.
This is because the backend server is serving the static files from the build folder.
To see changes on 3000, you will need to run `npm run build` to update the build folder.

### `npm run build:backend`

If you want to work on only the backend server, you can use this command to run the backend server in development mode.
The backend server will restart when changes are made to the code.

This command will build the frontend once before starting the backend server.
This is done so that the backend server can serve the static files from the build folder, emulating a production environment.

### `npm run build:frontend`

If you want to work on only the frontend, you can use this command to build run Vite in development mode.
Vite fully supports hot module replacement, so the frontend will update automagically when changes are made to the code.

This command will not start the backend server, which means you will not be able to use any of the proxied api endpoints.
If you need to use the api endpoints, you will need to run `npm run dev` instead.

### `npm run build`

This command will build both frontend and backend code, outputting files to the build folder.
The backend will be placed in `build` and the frontend will be placed in `build/frontend`.
This result can be sent as an artifact to a server to be deployed.

### `npm run build:backend`

This command will build the backend code only, outputting files to the build folder.

### `npm run build:frontend`

This command will build the frontend code only, outputting the static files to `build/frontend`.

### `npm run lint`

This command will run eslint on both `src/` and `frontend/` directories.
