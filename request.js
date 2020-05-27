require('dotenv').config();
let Client = require('node-rest-client').Client;
let username = process.env.FLIGHTAEARE_USER_NAME;
let apiKey = process.env.FLIGHTAEARE_API_KEY;
console.log()
let fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML2/';
let getInfoName = 'AirlineInfo'
let client_options = {
    user: username,
    password: apiKey
};
let client = new Client(client_options);
client.registerMethod('airlineInfo', `${fxmlUrl}${getInfoName}`, 'GET');
let airlineInfoArgs = {
    parameters: {
        airlineCode: 'JAL'
    }
};
client.methods.airlineInfo(airlineInfoArgs, function (data, response) {
    console.log(JSON.stringify(data))
    console.log(JSON.stringify(data.AirlineInfoResult.location))
});