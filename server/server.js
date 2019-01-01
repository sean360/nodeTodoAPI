//Libraries
const express = require('express');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

//Local Imports
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

//The Port to run
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//create a new todo
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (err) => {
            res.status(400).send(err);
        })
});

//get all todos
app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        }, (err) => {
            res.send(err).status(400);
        });
});

//get todo by id
app.get('/todos/:id', (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }, (err) => {
            res.status(400).send(err);
        });
});

//start up server
app.listen(port, () => {
    console.log(`App is up and running on ${port}`);
});

module.exports = { app };

