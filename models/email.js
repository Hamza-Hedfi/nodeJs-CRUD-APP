const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Email {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the email
      dbOp = db
        .collection('emails')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('emails').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('emails')
      .find()
      .toArray()
      .then(emails => {
        console.log(emails);
        return emails;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(mailId) {
    const db = getDb();
    return db
      .collection('emails')
      .find({ _id: new mongodb.ObjectId(mailId) })
      .next()
      .then(email => {
        console.log(email);
        return email;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(mailId) {
    const db = getDb();
    return db
      .collection('emails')
      .deleteOne({ _id: new mongodb.ObjectId(mailId) })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Email;
