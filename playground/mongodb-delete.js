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
    
    //deleteMany
    // db.collection('Todos').deleteMany({
    //     text: 'Lizl for lunch'
    // })
    // .then((result) => {
    //     console.log(result);
    // })

    //deleteOne
    // db.collection('Todos').deleteOne({
    //     text: 'Something to do'
    // })
    // .then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({
        completed: false
    })
    .then((result) => {
        console.log(result);
    });

    // client.close();
});