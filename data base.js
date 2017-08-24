var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:80800/my_database';

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(`Произошла ошибка: ${err}`)
  } else {
    console.log(`Соединение установлено с ${url}`)

    var collection = db.collection('users');

    var user_1 = { name: 'Olya', gender: 'f', user: 0001 };
    var user_2 = { name: 'Yulia', gender: 'f', user: 0002 };
    var user_3 = { name: 'Oksana', gender: 'f', user: 0003 };
    var user_4 = { name: 'Vera', gender: 'f', user: 0004 };
    var user_5 = { name: 'David', gender: 'm', user: 0005 };
    var user_6 = { name: 'Vahtang', gender: 'm', user: 0006 };

    function makeCollection(name, mass) {
      return new Promise((resolve, reject) => {
        var collection = db.collection(name);
        collection.insert(mass, );

        resolve(collection);
      })
    }

    function consoleData(collection) {
      return new Promise((resolve, reject) => {
        collection.forEach(el => {
          console.log(`Name: ${el.name} gender: ${el.gender}`)
        })

        resolve(collection);
      })
    }

    function renameUser(collection, user, name) {
      return new Promise((resolve, reject) => {
        collection.update({ user: user }, { '$set': { name: name } })
        resolve(collection);
      })
    }

    function deleteUser(collection, name) {
      return new Promise((resolve, reject) => {
        collection.remove({ name: name });
        resolve(collection);
      })
    }

    var newUserName = { name: 'Yulia', gender: 'f', user: 0002 };

    makeCollection('users', [user_1, user_2, user_3, user_4, user_5, user_6])
      .then(consoleData)
      .then(collection => renameUser(collection, newUserName.user, newUserName.name))
      .then(consoleData)
      .then(collection => deleteUser(collection, newUserName.name))


  }
  db.close();
});