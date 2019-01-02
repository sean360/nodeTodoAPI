const mongoose = require('mongoose');
const OPTS = { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true };
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, OPTS );

module.exports = {
    mongoose
};

