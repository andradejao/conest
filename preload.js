const { ipcRenderer, contextBridge } = require('electron')

// Gerenciamento de processos (desempenho e segurança)
contextBridge.exposeInMainWorld('api', {
    openClientes: () => ipcRenderer.send('open-clientes'),
    openFornecedores: () => ipcRenderer.send('open-fornecedores'),
    openProdutos: () => ipcRenderer.send('open-produtos'),
    openRelatorios: () => ipcRenderer.send('open-relatorios'),
    dbMessage: (message) => ipcRenderer.on('db-message', message),
    newClient: (cliente) => ipcRenderer.send('new-client', cliente),
    newProvider: (fornecedor) => ipcRenderer.send('new-provider', fornecedor),
    infoSearchDialog: () => ipcRenderer.send('dialog-infoSearchDialog'),
    focusSearch: (args) => ipcRenderer.on('focus-search', args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client', nomeCliente),
})

ipcRenderer.send('db-conect')

// Status de conexão (Verificação do database)
// ipcRenderer.send('send-message', "Status do database:")

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

