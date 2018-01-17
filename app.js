const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

console.log(argv);
var encodedAddress = encodeURIComponent(argv.a);
request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to Google Servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address.');
    } else if (body.status === 'OK'){
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Lat: ${body.results[0].geometry.location.lat}`);
        console.log(`Lng: ${body.results[0].geometry.location.lng}`);
    } else {
        console.log("Can't do the query");
    }

});
