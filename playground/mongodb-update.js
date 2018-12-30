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
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c28889868b92a3a740029b5')
    }, {
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    })
    .then((result) => {
        console.log(result);
    });
    
    // client.close();
});