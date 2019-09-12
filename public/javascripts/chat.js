//前端接收 server 上 的 socket 訊息
let wss;

//名稱變數
let strName = null;

//個人資料物件
let obj = {name: null, msg: null};

$(document).ready(async() => {
    //始初化 web socket 
    await initWebSocket();

    //詢問姓名
    strName = prompt('請輸入您的姓名', '');
    if( ['', null].indexOf(strName) !== -1 ){
        strName = await getTime();
    }
    obj.name = strName;

    //送出訊息
    $(document).on('click', 'button#smb', function(event){
        event.preventDefault();
        let input = $('input#m');
        if(input.val() !== '') {
            let value = input.val();
            obj.msg = value;
            wss.send( JSON.stringify(obj) );
            input.val('');
        }
    });

    //送出訊息(欄位 enter 版)
    $(document).on('keypress', 'input#m', function(event){
        // event.preventDefault();
        let input = $(this);
        if(event.which === 13 && input.val() !== ''){
            let value = input.val();
            obj.msg = value;
            wss.send( JSON.stringify(obj) )
            input.val('');
        }
    });
});

//初始化 web socket
async function initWebSocket() {
    //連線
    wss = new WebSocket('ws://localhost:5566');

    //連線開啟時
    wss.onopen = function() {
        console.log(`WebSocket has been opened.`);
    };
    
    /**
     * 從後端收到訊息時
     * 
     * 格式: string, Buffer, ArrayBuffer, Array, or Array-like Object
     */
    wss.onmessage = function(event) {
        let objOthers = JSON.parse(event.data);
        $('ul#messages').append(`<li>${objOthers.name} 說: ${objOthers.msg}</li>`)
    };

    //連線關閉時
    wss.onclose = function(event){
        console.log(`WebSocket server has been closed`);
        console.dir(event, {depth: null});
    };

    //連線發生錯誤時
    wss.onerror = function(err) {
        console.log(`WebSocket got an error.`);
        console.error(err);
    }
}

//取得「年月日時分秒」
async function getTime(){
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return `${year}${month}${day}${hour}${minute}${second}`;
}