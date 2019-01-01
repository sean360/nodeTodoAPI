const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const database = 'TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `${url}/${database}`, { useNewUrlParser: true });

module.exports = {
    mongoose
};