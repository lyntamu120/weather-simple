const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddress = encodeURIComponent(argv.a);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
    .then((res) => {
        if (res.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address');
        }
        var lat = res.data.results[0].geometry.location.lat;
        var lng = res.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/3a52bc8cc9adcc2a600849530355bc1b/${lat},${lng}`;
        console.log(res.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    })
    .then((res) => {
        var temp = res.data.currently.temperature;
        var apparentTemperature = res.data.currently.apparentTemperature;
        console.log(`It's currently ${temp}, it feels like ${apparentTemperature}.`);
    })
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log('Unable to connect to API servers');
        } else {
            console.log(e.message);
        }
    });
