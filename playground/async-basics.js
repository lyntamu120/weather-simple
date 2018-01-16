const fs = require('fs');
console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Second callback');
}, 0)

fs.writeFileSync('test.txt', 'Hello world!');
var text = fs.readFileSync('test.txt');
console.log(text);
console.log('Finishing app');
