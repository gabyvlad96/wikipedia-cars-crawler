
## Introduction
The application is composed of 2 parts:
- a web crawler that gets a list of all cars from Wikipedia and exposes it through an API
- an interface to display the data of cars

## Usage
The applicaton interface is available at http://wiki-crawler.aws-gabriel.de/

If you want to run it locally you need to start the server and the web client separately.

Start the server from the `/server` directory:

```
npm install
node crawlerAPi.js
 ```

To start the client app you simply go to `/client`, install npm dependencies and run the application:
```
npm install
npm start
```

## Description
### Structure

The app is composed of a Node.js server and a React.js app.
The server has two endpoints that accept GET requests and return a list of cars and relevant information about them.
The React app is a single-page app that contains the full list of cars and displays information about each car such as name, production date, etc.

### Endpoints

- `/getAllCars` - returns a list of all cars. Item structure:
   ```
   {
    "name": string,
    "productionPeriod": Array<string>,
    "modelUrlFull": string,
    "imageUrl": string,
   }
   ```
  
- `/getCarDetails<url>` - takes a specific car's wiki page URL as a parameter and returns an array of strings containing the body class of the car


 
