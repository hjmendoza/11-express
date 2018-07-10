'use strict';

import storage from '../storage/data-store.js';

import uuid from 'uuid/v1';

class Note {
  constructor(config) {
    this.id = uuid();
    this.createOn = new Date();
    this.title = config && config.title || '';
    this.content = config && config.content || '';
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

  static updateOne(criteria) {
    console.log(criteria);
    return storage.update(this);
  }

  static deleteOne(id) {
    return storage.delete(id);
  }

}

export default Note;