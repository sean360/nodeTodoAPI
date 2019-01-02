const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
    id: 10,
    name: 'Sean',
    company: 'Systems360'
};

const token = jwt.sign(data, '123abc');

const decoded = jwt.verify(token, '123abc');
console.log(decoded);

// const msg = 'myPassword';
// const hashed = SHA256(msg);

// console.log(`msg: ${msg}`);
// console.log(`hashed: ${hashed}`);

// const data = {
//     id: 4
// };

// const token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
// };

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data) + 'SomeSecret').toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();

// if (resultHash === token.hash){
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed, can not trust it');
// }
