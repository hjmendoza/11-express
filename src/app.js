'use strict';


import express from 'express';

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

import router from './api/api.js';
app.use(router);

let alreadyRunning = false;

let server;

module.exports = {
  start: (port) => {
    if(!alreadyRunning) {
      server = app.listen(port, (err) =>{
        if(err) {throw err;}

        alreadyRunning = true;
        console.log(`Server is up on port ${port}`);
      });
    }
    else {
      console.log('Server already running on port', port);
    }
  },

  stop: () => {
    server.close( () => {
      alreadyRunning = false;
      console.log('Server is closed');
    });
  },
};