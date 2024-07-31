const { ipcRenderer, contextBridge } = require('electron')

// Gerenciamento de processos (desempenho e segurança)
contextBridge.exposeInMainWorld('api', {
    openClientes: () => ipcRenderer.send('open-clientes'),
    openFornecedores: () => ipcRenderer.send('open-fornecedores'),
    openProdutos: () => ipcRenderer.send('open-produtos'),
    openRelatorios: () => ipcRenderer.send('open-relatorios'),
    dbMessage: (message) => ipcRenderer.on('db-message', message)
})

ipcRenderer.send('db-conect')

// Status de conexão (Verificação do database)
// ipcRenderer.send('send-message', "Status do database:")

ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})

// Inserir data na página
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return data.toLocaleDateString('pt-br', options)
}

// Interagir diretamente no DOM do doc HTML (index.html)
window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})