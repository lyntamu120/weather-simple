const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/3a52bc8cc9adcc2a600849530355bc1b/${lat},${lng}`,
        json: true
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            callback(undefined, {
                temp: body.currently.temperature,
                realTemp: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
}

module.exports = {
    getWeather
}
