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
    nameClient: (args) => ipcRenderer.on('name-client', args),
    clearSearch: (args) => ipcRenderer.on('clear-search', args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client', dadosCliente),
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    updateClient: (cliente) => ipcRenderer.send('update-client', cliente),
    deleteClient: (idCli) => ipcRenderer.send('delete-client', idCli),
    searchProvider: (nomeFornecedor) => ipcRenderer.send('search-provider', nomeFornecedor),
    nameProvider: (args) => ipcRenderer.on('name-provider', args),
    dataProvider: (dadosFornecedor) => ipcRenderer.on('data-provider', dadosFornecedor),
    updateProvider: (fornecedor) => ipcRenderer.send('update-provider', fornecedor),
    deleteProvider: (idForn) => ipcRenderer.send('delete-provider', idForn)
})

ipcRenderer.send('db-conect')

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

