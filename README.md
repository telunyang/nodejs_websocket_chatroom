# nodejs-websocket-chatroom
Using WebSocket, Express packages to build a simple real-time web chatroom.

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

## 6. Enjoy it!

## 7. Demo
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