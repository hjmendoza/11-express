'use strict';

const storage = {};

const database = {};

storage.getAll = () => {
  return Promise.resolve(database);
};

storage.get = (id) => {
  return new Promise((resolve, reject) => {
    if (database[id]) {
      resolve(database[id]);
    } else {
      reject(`${id} not found`);
    }
  });
};

// For saving, we just add the data into the "database", keyed by the snack's id.
storage.save = (data) => {
  return new Promise((resolve, reject) => {
    if (data.id) {
      database[data.id] = data;
      resolve(database[data.id]);
    } else {
      reject('Invalid Data (No ID)');
    }
  });
};

storage.deleteOne = id => {
  if (err) {
    reject(err);
  }
  resolve(`${id} has been deleted found`);
};

storage.updateOne = (id, body) => {
  return new Promise((resolve, reject) => {
    if (!body.id) {
      reject('No Record ID Specified');
    }

    let file = `${root}/${id}.json`;
    let text = JSON.stringify(body);

    fs.writeFile(file, text, (err) => {
      if (err) {
        reject(err);
      }
      resolve(body);
    });

  });
};

storage.patchOne = (id, body) => {
  return new Promise((resolve, reject) => {

    storage.get(id)
      .then(data => {
        Object.entries(body).forEach(prop => {
          data[prop[0]] = prop[1];
        });

        let file = `${root}/${id}.json`;
        let text = JSON.stringify(data);

        fs.writeFile(file, text, (err) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });

  });
};

export default storage;