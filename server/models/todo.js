const mongoose = require('mongoose');

//setup the to do model(the collection//table//)
const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        min: [1, 'Must be at least two characters'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// const newTodo = new Todo({
//     text: '  my trimmed todo  '
// });

// newTodo.save()
// .then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//     console.log(e);
// });

module.exports = {Todo};