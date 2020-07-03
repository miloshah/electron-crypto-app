const electron = require('electron')
const path = require('path')
//allow us to launch a new window in our Electron app
const BrowserWindow = electron.remote.BrowserWindow
//IPC render
const ipc = electron.ipcRenderer
const axios = require('axios');

//listen for click events on the notify button
const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPriceVal;
var targetPrice = document.getElementById('targetPrice')

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname, '../assets/images/btc.png')
}

//API call
function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const cryptos = res.data.BTC.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')
    })

    //Desktop notification
    if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
        const myNotification = new window.Notification(notification.title, notification)
    }

    myNotification.onclick = () => {
        console.log('clicked')
    }
}
getBTC();
setInterval ( getBTC, 30000 );//Callling every 3 sec

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({
        frame: false,//frameless window
        transparent: true,
        alwaysOnTop: true, //Sticky Window in Electron
        width: 400,
        height: 200
    })
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
})

//receive message from main process
ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en') //update the html
})