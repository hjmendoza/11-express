'use strict';

import storage from '../lib/storage/data-store.js';
import uuid from 'uuid/v1';

class Snack{

  constructor(config) {
    this.id = uuid();
    this.name = config && config.title || '';
    this.calories = config && config.title || '';
  }

  save() {
    return storage.save(this);
  }

  static fetchAll() {
    return storage.getAll();
  }

  static findOne(id) {
    return storage.get(id);
  }

  static updateOne(id, body) {
    return storage.update(id, body);
  }

  static deleteOne(id) {
    return storage.deleteOne(id);
  }

}

export default Snack;