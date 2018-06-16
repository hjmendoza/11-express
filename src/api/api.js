'use strict';

import express from 'express';
const router = express.Router();

import Notes from '../models/notes.js';

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

let serverError = (res,err) => {
  let error = { error:err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  let name = req.query.name || '';
  res.write(`Hello ${name}`);
  res.end();
});

router.get('/api/v1/snacks', (res) => {
  Notes.fetchAll()
    .then( data => sendJSON(res,data) )
    .catch( err => serverError(res,err) );
  res.end();
});

router.get('/api/v1/snacks/:id', (req,res) => {
  if ( req.params.id ) {
    Notes.findOne(req.params.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
      res.end();
  } else if ( !req.params.id ){
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end();
  }
  else {
    res.statusCode = 404;
    res.statusMessage = 'Not found';
    res.end();
  }

});

router.post('/api/v1/snacks', (req,res) => {
  let record = new Notes(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(console.error);

});

router.put('/api/v1/snacks/:id', (req, res) => {
  Notes.updateOne(req.params.id, req.body)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.delete('/api/v1/snacks/:id', (req, res) => {
  if (req.params.id) {
    Notes.deleteOne(req.params.id)
      .then(() => {
        res.statusCode = 204;
        res.statusMessage = 'ID DELETED'
        res.end();
      })
      .catch(err => serverError(res, err));
  } else {
    res.statusCode = 404;
    res.write(`ID Not found`);
    res.end();
  }
});

export default router;