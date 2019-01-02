const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        min: [1, 'that is not a valid email'],
        lowercase: true,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'

        }
    },
    password: {
        type: String,
        trim: true,
        min: [6, 'Password needs to be six characters or more'],
        required: true 
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


//instance method gets called with indiviual document
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'asdfasdf').toString();

    user.tokens = user.tokens.concat([{access, token}]);

    return user.save()
    .then(() => {
        return token;
    })
};

//model method gets called with the model(not the document) as the this binding
UserSchema.statics.findByToken = function (token) {
    
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'asdfasdf');
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

//setup the user model(the collection//table//)
const User = mongoose.model('User', UserSchema);


module.exports = { User };