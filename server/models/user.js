const mongoose = require('mongoose');

//setup the user model(the collection//table//)
const User = mongoose.model('User',{
    email: {
        type: String,
        trim: true,
        min: [1, 'that is not a valid email'],
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    }
});

// const newUser = new User({
//     email: 'seankonigphotography@gmail.com'
// });

// newUser.save()
// .then((doc) => {
//     console.log(`success: ${JSON.stringify(doc, undefined, 2)}`);
// }, (e) => {
//     console.log(e);
// });

module.exports = {User};