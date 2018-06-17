'use strict';

import express from 'express';
const router = express.Router();

import Snack from '../models/snacks';

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

let serverError = (res,err) => {
  let error = { error:err };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.end();
});

router.get('/api/v1/snacks/', (res) => {
    Snack.fetchAll()
    .then( data => sendJSON(res,data) )
    .catch( err => serverError(res,err) );
});

router.get('/api/v1/snacks/:id', (req,res) => {
  if ( req.params.id ) {
    Snack.findOne(req.params.id)
      .then(data => sendJSON(res, data))
      .catch(err => serverError(res, err));
  } else if ( !req.params.id ){
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
  }
  else {
    res.statusCode = 404;
    res.statusMessage = 'Not found';
  }
});

router.post('/api/v1/snacks', (req,res) => {
  if(req.body === undefined){
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Bad Request');
    res.end();
  } else {
    let record = new Snack(req.body);
    record.save()
      .then(data => sendJSON(res,data))
      .catch(console.error);
  }

});


router.put('/api/v1/snacks/:id', (req, res) => {
  Snacks.updateOne(req.params.id, req.body)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.delete('/api/v1/snacks/:id', (req, res) => {
  if (req.params.id) {
    Snack.deleteOne(req.params.id)
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