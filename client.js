const WebSocket = require('ws');
 
const wss = new WebSocket('ws://localhost:5566');

let objClient = {name: 'CLIENT', msg: null};

wss.on('open', function () {
    objClient.msg = 'Hello, SERVER!!';
    wss.send( JSON.stringify(objClient) );
});
 
wss.on('message', function (strObj) {
    let objOthers = JSON.parse(strObj);
    console.log('%s 說: %s', objOthers.name, objOthers.msg);
});