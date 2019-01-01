const mongoose = require('mongoose');
const OPTS = { family: 4, useNewUrlParser: true, useFindAndModify: false };
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, OPTS );

module.exports = {
    mongoose
};

