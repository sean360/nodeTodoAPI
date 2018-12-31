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

const port = 3000;

app.listen(port, () => {
    console.log(`App is up and running on ${port}`);
});

module.exports = {app};

