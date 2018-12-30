//set up mongo client
//const MongoClient = require('mongodb').MongoClient;
//desctrutioning
const {MongoClient, ObjectID} = require('mongodb');

//connect to database
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err){
        //use return here to stop the application on fail
        return console.log('Unable to connect to local mongodb');
    }
    const db = client.db('TodoApp');
    console.log('Connected to mongodb');
    
    db.collection('Todos').find().count().then((count) => {
        console.log(`The count: ${count}`);
    }, (err) => {
        console.log(err);
    });

    client.close();
});