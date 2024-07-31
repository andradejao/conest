const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')
// Importação do módulo de conexão
const { conectar, desconectar } = require('./database.js')
// Importação do Schema (model) das coleções(tables)
const clienteModel = require('./src/models/Cliente.js')

// Janela principal (Definir o objeto win como variável pública)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: './src/public/img/iconhome.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// Janela Sobre
const aboutWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const about = new BrowserWindow({
            width: 360, // largura
            height: 260, // altura
            icon: './src/public/img/about.png',
            resizable: false, // evitar o redimensionamento
            minimizable: false,
            autoHideMenuBar: true, // esconder menu
            parent: father, // estabelece a relação parent
            modal: true,
        })
        about.loadFile('./src/views/sobre.html')
    }
}

const clientesWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const clientes = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/client.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true
        })
        clientes.loadFile('./src/views/clientes.html')
    }
}

const fornecedoresWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const fornecedores = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/fornecedor.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true
        })
        fornecedores.loadFile('./src/views/fornecedores.html')
    }
}

const produtosWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const produtos = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/produto.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true
        })
        produtos.loadFile('./src/views/produtos.html')
    }
}

const relatoriosWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const relatorios = new BrowserWindow({
            width: 1280,
            height: 720,
            icon: './src/public/img/produto.png',
            resizable: false, // evitar o redimensionamento
            autoHideMenuBar: true, // esconder menu
            parent: father,
            modal: true
        })
        relatorios.loadFile('./src/views/relatorios.html')
    }
}

// Inicialização da aplicação
app.whenReady().then(() => {

    // Status de conexão com o db
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message}`)
        statusConexao()
    })

    ipcMain.on('db-conect', async (event, message) => {
        await conectar()
        event.reply('db-message', "conectado")
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
        label: 'Relatórios',
        click: () => relatoriosWindow()
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

ipcMain.on('open-relatorios', () => {
    relatoriosWindow()
})

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) // teste
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

