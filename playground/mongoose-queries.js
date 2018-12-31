const ObjectID = require('mongodb').ObjectID;

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '5c29d6b527d52154a8f9e878';

if(!ObjectID.isValid(id)){
    return console.log('No man, that ID is fucked up');
}

// Todo.find({
//     _id: id
// })
// .then((doc) => {
//     console.log(doc);
// }, (e) => {
//     console.log(e);
// });

// Todo.findOne({
//     _id: id
// })
// .then((todo) => {
//     console.log(todo);
// }, (e) => {
//     console.log(e);
// });

Todo.findById(id)
.then((todo) => {
    if(!todo){
        return console.log('Nothing found');
    }
    console.log(todo);
}).catch((e) => console.log(e));