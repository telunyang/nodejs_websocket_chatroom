# nodejs-websocket-chatroom
Using WebSocket, Express packages to build a simple real-time web chatroom.

In general, you can lauch this service directly after pulling this respository and installing packages.

If you have owned an existing express server, You might as well refer to instruments as follows: 

## 1. Installation
- Install packages from package.json
```sh
$ npm i --save
```
- You can install **ws** package if you have owned an existing express web server
```sh
$ npm i ws --save
```

## 2. Testing with client.js and server.js
1. Launch server.js
```sh
# Launch your server
$ node server.js # You will see "Listening to port {portNumber}"
```
2. Launch client.js
```sh
# Try to send a message to server
$ node client.js
```
3. Preview the result
![Client sent a message to server](https://i.imgur.com/SQULyHL.png "Client sent a message to server")
4. Hint: You have to _launch server.js_ **before** you launch the client.js.

## 3. Place chat.ejs file in views folder
Copy or move chat.ejs file to views folder if you have owned an existing express service.

## 4. Modify "routes/index.js"
Replace rendering page name "index" to "chat".
```
router.get('/', function(req, res, next) {
  res.render('chat', { 
      title: 'Websocket chatroom exhibition with [Express web server]' 
  });
});
```

## 5. Set proper domain name in "javascripts/chat.js" for WebSocket connection
```
# At about 49 lines
# Please set your domain name or localhost
.
.
wss = new WebSocket('ws://{domain-name}:5566');
```

## 6. Modify bin/www
1. Add package requirement
```
const WebSocket = require('ws');
```
2. Add code for server side
```
/**
 * 自訂 web socket server
 */
const wss = new WebSocket.Server({server: server});

//伺服器傳送資料用的物件
let objServer = {name: 'SERVER', msg: null};

wss.on('connection', (ws) => {
    //始初訊息
    objServer.msg = '聊天室已開啟!!';
    ws.send( JSON.stringify(objServer) );

    //接收訊息的事件
    ws.on('message', function (obj) {
        //將字串轉為物件來存取屬性
        obj = JSON.parse(obj);
        console.log('%s 說: %s', obj.name, obj.msg);

        //廣播資訊給線上所有人
        wss.clients.forEach((client) => {
            // if(client !== ws && client.readyState === WebSocket.OPEN) { //只廣播給其他人，不傳給自己
            if (client.readyState === WebSocket.OPEN) { //廣播給自己和其他人
            client.send( JSON.stringify(obj) );
            }
        });
    });
});
```

## 7. Enjoy it!
```sh
$ node bin/www
```

## 8. Demo
[![Build a web socket chatroom via Node.js Express](https://i.ytimg.com/vi/jf75BK-zxac/hqdefault.jpg)](https://youtu.be/jf75BK-zxac "Build a web socket chatroom via Node.js Express")

## Notice
1. You might as well claim an **object** variable for sending data.
```
let objClient = {
    name: 'your-name', 
    msg: 'your-message'
};
```
2. You have to convert object to string for passing variable.
```
# Send an object to server/client
ws.send( JSON.stringify( objClient ) );
```