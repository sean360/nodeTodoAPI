//set up mongo client
//const MongoClient = require('mongodb').MongoClient;
//destructuring
const {MongoClient, ObjectID} = require('mongodb');

//connect to database
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err){
        //use return here to stop the application on fail
        return console.log('Unable to connect to local mongodb');
    }
    const db = client.db('TodoApp');
    console.log('Connected to mongodb');
    
    //insert a record into our todos collection
    // db.collection('Todos').insertOne({
    //     text: 'I need to finish this app',
    //     completed: false
    // }, (err, result) => {
    //     if (err){
    //         return console.log(err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    //insert a record into our users collection
    // db.collection('Users').insertOne({
    //     name: 'Sean',
    //     age: 33,
    //     location: 'test location'
    // }, (err, result) => {
    //     if (err){
    //         return console.log(err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();
});