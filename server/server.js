require('./config/config');
//Libraries
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

//Local Imports
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();

//The Port to run
const port = process.env.PORT;

app.use(bodyParser.json());

//create a new todo
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        }).catch((e) => {
            res.status(400).send(e);
        });
});

//get all todos
app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos });
        }).catch((e) => {
            res.send(e).status(400);
        });
});

//get todo by id
app.get('/todos/:id', (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Todo.findById(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.send({ todo });
        }).catch((e) => {
            res.send(e).status(400);
        });
});

app.delete('/todos/:id', (req, res) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Todo.findByIdAndDelete(id)
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.status(200).send({ todo });
        }).catch((e) => {
            res.send(e).status(400);
        });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;

    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    //update completed and completedAt
    if (_.isBoolean(body.completed) && body.completed) {
        //set completedAT
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }
            res.status(200).send({ todo });
        }).catch((e) => {
            res.send(e).status(400);
        });
});

app.post('/users', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);

    const user = new User({
        email: body.email,
        password: body.password
    });

    user.save()
    .then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => res.send(e).status(400));
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//start up server
app.listen(port, () => {
    console.log(`App is up and running on ${port}`);
});

module.exports = { app };

