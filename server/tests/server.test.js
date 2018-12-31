const expect = require('expect');
const request = require('supertest');

//local
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
})

describe('Post/todos', () => {
    it('should return the object', (done) => {
        let text = 'test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err){
                    return done(err);
                }

                Todo.find()
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
                if (err){
                    return done(err);
                }

                //if all worked there should not be any info in the database so we check the lengts of the returned object and again return done
                Todo.find()
                .then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
})