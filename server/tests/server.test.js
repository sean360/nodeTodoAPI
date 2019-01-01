const expect = require('expect');
const request = require('supertest');
const ObjectID = require('mongodb').ObjectID;

//local
const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 666 
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('Post/todos', () => {
    it('should return the object', (done) => {
        let text = 'test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text })
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch((e) => done(e));
            });
    });


    //check to see if posting empty values return an error
    it('should not create to do with invalid data', (done) => {
        request(app)
            //route to test
            .post('/todos')
            //data object to send
            .send({})
            //result we expect
            .expect(400)
            //tell it we are done and return the done method to complete the async call if there is a error
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                //if all worked there should not be any info in the database so we check the lengts of the returned object and again return done
                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should return all todos from db', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    });
});

describe('Get /todos/:id', () => {
    it('should return document with given id', (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 404 if to do not found', (done) => {
        const id = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .get('/todos/5254832')
            .expect(404)
            .end(done)
    });

});

describe('Delete /todos/id', () => {
    it('should delete the document with the given id', (done) => {
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end((err, res) => {
            if (err){
                return done(err);
            }
            
            Todo.findById(res.body.todo._id)
            .then((todo) => {
                expect(todo).toBeFalsy();
                done()
            }).catch((e) => done(e));
        })
    });

    it('should return a 404 if to do not found', (done) => {
        const id = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .delete('/todos/5254832')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the document with the given id', (done) => {
        const text = 'Testing the updates'

        request(app)
        
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .send({
            text,
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe('Testing the updates');
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done)
    });

    it('should set completed at to null', (done) => {
        const text = 'Testing the updates!!!!'

        request(app)
        
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .send({
            text,
            completed: false
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe('Testing the updates!!!!');
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBe(null);
        })
        .end(done)
    });
})