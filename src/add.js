const electron = require('electron')
const path = require('path')
const remote = electron.remote

//IPC render process
const ipc = electron.ipcRenderer

//get close btn
const closeBtn = document.getElementById('closeBtn')
//get update btn
const updateBtn = document.getElementById('updateBtn')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

updateBtn.addEventListener('click', function () {
    //send this to main process
    ipc.send('update-notify-value', document.getElementById('notifyVal').value) 
  
    // Close this window
    var window = remote.getCurrentWindow();
    window.close();
})
