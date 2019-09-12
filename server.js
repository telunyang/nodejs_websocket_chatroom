const fs = require('fs');
// const https = require('https');
const http = require('http');
const WebSocket = require('ws');

const port = 5566;

const server = http.createServer();

// const server = https.createServer({
//     key: fs.readFileSync("path/private.key"),
//     cert: fs.readFileSync("path/certificate.crt"),
//     ca: fs.readFileSync("path/ca_bundle.crt")
// });

const wss = new WebSocket.Server({server: server});

//伺服器傳送資料用的物件
let objServer = {name: 'SERVER', msg: null};

wss.on('connection', (ws) => {
    //接收訊息的事件
    ws.on('message', function (strObjClient) {
        //將字串轉為物件來存取屬性
        let objClient = JSON.parse(strObjClient);
        console.log('%s 說: %s', objClient.name, objClient.msg);

        //廣播資訊給線上所有人
        wss.clients.forEach((client) => {
            // if(client !== ws && client.readyState === WebSocket.OPEN) { //只廣播給其他人，不傳給自己
            if (client.readyState === WebSocket.OPEN) { //廣播給自己和其他人(意即所有人)
                objServer.msg = 'Hi, CLIENT!!';
                client.send( JSON.stringify(objServer) );
            }
        });
    });
});


 
server.listen(port);
console.log(`Listening to port ${port}`);