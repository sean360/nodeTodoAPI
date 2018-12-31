//Libraries
const express = require('express');
const bodyParser = require('body-parser');

//Local Imports
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

//create a new todo
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    
    todo.save()
    .then((doc) => {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

//get all todos
app.get('/todos', (req, res) => {
    Todo.find()
    .then((todos) => {
        res.send({
            todos,
            result: 'success'
        });
    }, (err) => {
        res.send(err).status(400);
    });
});

//The Port to run
const port = 3000;

//start up server
app.listen(port, () => {
    console.log(`App is up and running on ${port}`);
});

module.exports = {app};

