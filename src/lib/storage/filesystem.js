'use strict';
import fs from 'fs';

const storage = {};

const dataDirectory = `${__dirname}/../../../data`;

let readFilePromise = function(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, data){
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};

storage.getAll = () => {
  return new Promise( (resolve,reject) => {
    fs.readdir(dataDirectory, (err,files) => {
      if(err) { reject(err); }
      let promises = [];

      while(files.length) {
        let file = files.shift();
        file = `${dataDirectory}/${file}`;
        if ( file.match(/\.json/) ) { promises.push( readFilePromise(file) ); }
      }

      Promise.all(promises)
        .then(contents => {
          let database = contents.reduce( (db,data) => {
            let obj = JSON.parse(data.toString());
            db[obj.id] = obj;
            return db;
          },{});
          resolve(database);
        })
        .catch(console.log);
    });
  });
};

// export default storage;