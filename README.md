![cf](https://i.imgur.com/7v5ASc8.png) 11: Express and Babel - Haley Mendoza
======

[![Build Status](https://travis-ci.com/hjmendoza/11-express.svg?branch=master)](https://travis-ci.com/hjmendoza/11-express)

HEROKU: https://express-haley.herokuapp.com/
 
 ## Configuration 
 * **index.js** - the entry point for application
 * **src/** - contains core  files and folders
 * **src/app.js** - contains core bootstrap
 * **src/lib/** - contains module definitions
 * **\_\_test\_\_/** - contains unit tests

## About the Application
*  A single resource API using the express framework. Leverages 3rd party helper modules for logging and handling errors

#### Features 
* Code implemented using ES6 Modules (import/export) using Babel
* Created an HTTP server using `express`
* Created a object constructor that creates a _simple resource_ with at least 3 properties
* Used the JSON parser included with the `body-parser` module as a middleware component to parse the request body on `POST` and `PUT` routes
* Persists API data using the storage module and file system persistence

#### Server Endpoints
* **`/api/vi/snacks`**
* `POST` request - receives data as stringifed JSON in the body of a **POST** request to create a new resource
* `GET` - receives `/:id` as a route parameter to **GET** a specific resource (as JSON)
* `DELETE` - receives `/:id` as a route parameter to **DELETE** a specific resource (as JSON). Returns 204 status code with no content in the body
* Tests written to ensure api returns correct status codes and HTTP requests respond as expected

## To Start Application
Clone down code. Define port in .env. Run application using either Postman or HTTP. View application page using Heroku link.
  * `localhost:<PORT>` will start at homepage
  * `localhost:<PORT>/api/v1/snacks` will start at endpoint of API
  * Use postman or httpie to register other HTTP requests