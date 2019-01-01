const ObjectID = require('mongodb').ObjectID;

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

Todo.deleteMany({})
.then((result) => {
    console.log(result);
});

// Todo.findByIdAndDelete({
//     _id: new ObjectID('5c2b26e6ba32634908eedf54')
// })
// .then((result) => {
//     console.log(result);
// });