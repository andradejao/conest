const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')
// Importação do módulo de conexão
const { conectar, desconectar } = require('./database.js')

// Janela principal (Definir o objeto win como variável pública)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/iconhome.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// Janela Sobre
let about // Resolver bug de abrir várias janelas
// Se a janela about não estiver aberta(Bug1)
const aboutWindow = () => {
    if (!about) {
        about = new BrowserWindow({
            width: 360, // largura
            height: 260, // altura
            icon: './src/public/img/about.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
        })
    }
    about.loadFile('./src/views/sobre.html')
    // Reabrir a janela se estiver fechada (Bug1)
    about.on('closed', () => {
        about = null
    })
}

let clientes // Resolver bug de abrir várias janelas
// Se a janela clientes não estiver aberta(Bug1)
const clientesWindow = () => {
    if (!clientes) {
        clientes = new BrowserWindow({
            width: 800,
            height: 600,
            icon: './src/public/img/.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
        })
    }
    clientes.loadFile('./src/views/clientes.html')
    // Reabrir a janela se estiver fechada (Bug1)
    clientes.on('closed', () => {
        clientes = null
    })
}

let fornecedores
const fornecedoresWindow = () => {
    if (!fornecedores) {
        fornecedores = new BrowserWindow({
            width: 800,
            height: 600,
            icon: './src/public/img/.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
        })
    }
    fornecedores.loadFile('./src/views/fornecedores.html')
    // Reabrir a janela se estiver fechada (Bug1)
    fornecedores.on('closed', () => {
        fornecedores = null
    })
}

let produtos
const produtosWindow = () => {
    if (!produtos) {
        produtos = new BrowserWindow({
            width: 800,
            height: 600,
            icon: './src/public/img/.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
        })
    }
    produtos.loadFile('./src/views/produtos.html')
    // Reabrir a janela se estiver fechada (Bug1)
    produtos.on('closed', () => {
        produtos = null
    })
}

// Inicialização da aplicação
app.whenReady().then(() => {

    // Status de conexão com o db
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message}`)
        statusConexao()
    })

    // Desconectar do db ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientesWindow()
            },
            {
                label: 'Fornecedores',
                click: () => fornecedoresWindow()
            },
            {
                label: 'Produtos',
                click: () => produtosWindow()
            },
            {
                type: 'separator',
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            },
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas de Desenvolvedor',
                role: 'toggleDevTools',
            },
            {
                type: 'separator',
            },
            {
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir Zoom',
                role: 'zoomOut',
            },
            {
                label: 'Restaurar Zoom',
                role: 'resetZoom',
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Sobre',
                accelerator: 'Alt+F1',
                click: () => aboutWindow()
            }
        ]
    },
]

ipcMain.on('open-clientes', () => {
    clientesWindow()
})

ipcMain.on('open-fornecedores', () => {
    fornecedoresWindow()
})

ipcMain.on('open-produtos', () => {
    produtosWindow()
})

// ---------------------------------------

// Função que verifica o status da conexão
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Database conectado")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }
}

