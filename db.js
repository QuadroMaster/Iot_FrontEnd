const fs = require("fs");
const { nanoid } = require("nanoid");

const DB_PATH = `${__dirname}/data.json`;

class Store {
  constructor(items) {
    this.items = items || [];
  }

  find(predicate) {
    if (!predicate) {
      return [...this.items];
    }
    return this.items.find(predicate);
  }

  insert(doc) {
    if (!doc._id) {
      doc = { _id: nanoid(10), ...doc };
    }
    this.items.push(doc);
    flush();
    return doc;
  }

  update(id, update) {
    let doc = this.items.find((x) => x._id == id);
    if (!doc) {
      return doc;
    }
    const result = Object.assign(doc, update);
    flush();
    return result;
  }

  remove(id) {
    let doc = this.items.find((x) => x._id == id);
    if (!doc) {
      return doc;
    }
    const idx = this.items.indexOf(doc);
    this.items.splice(idx, 1);
    flush();
    return doc;
  }

  toJSON() {
    return this.items || [];
  }
}

let db = {};

function reload() {
  try {
    const text = fs.readFileSync(DB_PATH).toString();
    Object.assign(db, JSON.parse(text));
  } catch {}

  db.users = new Store(db.users);
  db.devices = new Store(db.devices);
}

function flush() {
  const json = JSON.stringify(db, null, 2);
  fs.writeFileSync(DB_PATH, json);
}

reload();

fs.watchFile(DB_PATH, () => reload());

module.exports = db;