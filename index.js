require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 3001
const Client = require('node-rest-client').Client;

//https://flightaware.com/commercial/flightxml/
//上記APIの認証情報とURL
const username = process.env.FLIGHTAEARE_USER_NAME;
const apiKey = process.env.FLIGHTAEARE_API_KEY;
const fxmlUrl = 'https://flightxml.flightaware.com/json/FlightXML2/';

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.post('/auth/', (req, res) => {
    console.log(req.body);
    // res.send("Received POST Data!");
    let flights = req.body.howmany
    console.log(flights)
    let getInfoName = 'SearchBirdseyeInFlight'
    // searchbirdseyeinflight
    let client_options = {
        user: username,
        password: apiKey
    };
    let client = new Client(client_options);
    client.registerMethod('searchbirdseyeinflight', `${fxmlUrl}${getInfoName}`, 'GET');
    let searchBirdsEyeInFlightArgs = {
        parameters: {
            query: '{>= lat 0} {false cancelled} {in dest {RJAA RJAF RJAH RJAK RJAM RJAN RJAW RJAZ RJBB RJBD RJBE RJBK RJBM RJBT RJCA RJCB RJCC RJCH RJCJ RJCK RJCM RJCN RJCO RJCR RJCT RJCW RJDA RJDB RJDC RJDG RJDK RJDM RJDO RJDT RJDU RJEB RJEC RJEO RJER RJFA RJFC RJFE RJFF RJFG RJFK RJFM RJFN RJFO RJFR RJFS RJFT RJFU RJFY RJFZ RJGG RJJJ RJKA RJKB RJKI RJKN RJNA RJNF RJNG RJNH RJNK RJNO RJNS RJNT RJNW RJNY RJOA RJOB RJOC RJOE RJOH RJOI RJOK RJOM RJOO RJOR RJOS RJOT RJOW RJOY RJSA RJSC RJSD RJSF RJSI RJSK RJSM RJSN RJSR RJSS RJSU RJSY RJTA RJTC RJTF RJTH RJTI RJTJ RJTK RJTL RJTO RJTQ RJTS RJTT RJTU RJTY ROAH RODN ROIG ROKJ ROKR ROMD ROMY RORA RORE RORH RORK RORS RORT RORY ROTM ROYN}} {in orig {RJAA RJAF RJAH RJAK RJAM RJAN RJAW RJAZ RJBB RJBD RJBE RJBK RJBM RJBT RJCA RJCB RJCC RJCH RJCJ RJCK RJCM RJCN RJCO RJCR RJCT RJCW RJDA RJDB RJDC RJDG RJDK RJDM RJDO RJDT RJDU RJEB RJEC RJEO RJER RJFA RJFC RJFE RJFF RJFG RJFK RJFM RJFN RJFO RJFR RJFS RJFT RJFU RJFY RJFZ RJGG RJJJ RJKA RJKB RJKI RJKN RJNA RJNF RJNG RJNH RJNK RJNO RJNS RJNT RJNW RJNY RJOA RJOB RJOC RJOE RJOH RJOI RJOK RJOM RJOO RJOR RJOS RJOT RJOW RJOY RJSA RJSC RJSD RJSF RJSI RJSK RJSM RJSN RJSR RJSS RJSU RJSY RJTA RJTC RJTF RJTH RJTI RJTJ RJTK RJTL RJTO RJTQ RJTS RJTT RJTU RJTY ROAH RODN ROIG ROKJ ROKR ROMD ROMY RORA RORE RORH RORK RORS RORT RORY ROTM ROYN}}',
            howMany: flights,
            offset: 0
        }
    };
    client.methods.searchbirdseyeinflight(searchBirdsEyeInFlightArgs, (data, response) => {
        console.log(JSON.stringify(data))
        console.log(data.toString('UTF-8'))
        // console.log(JSON.stringify(data.AirlineInfoResult.location))
        res.send(data)
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))