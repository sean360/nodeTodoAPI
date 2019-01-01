const env = process.env.NODE_ENV || 'development';
const OPTS = { family: 4, useNewUrlParser: true, useFindAndModify: false };
if (env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp', OPTS;
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TestTodoApp', OPTS;
}