const { ipcRenderer } = require('electron')

// Status de conexão (Verificação do database)
ipcRenderer.send('send-message', "Status do database:")

ipcRenderer.on('db-status', (event, status) => {
    console.log(status) 
})