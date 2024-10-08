const { ipcMain, dialog } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')
// Importação do módulo de conexão
const { dbStatus, desconectar } = require('./database.js')
// Importação do Schema (model) das coleções(tables)
const clienteModel = require('./src/models/Cliente.js')
const fornecedorModel = require('./src/models/Fornecedor.js')

// status db
let dbCon = null

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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
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
            modal: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })
        relatorios.loadFile('./src/views/relatorios.html')
    }
}

// Inicialização da aplicação
app.whenReady().then(() => {

    // // Status de conexão com o db
    // ipcMain.on('send-message', (event, message) => {
    //     console.log(`<<< ${message}`)
    //     statusConexao()
    // })

    ipcMain.on('db-conect', async (event, message) => {
        dbCon = await dbStatus()
        event.reply('db-message', "conectado")
    })

    // Desconectar do db ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar(dbCon)
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

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD Create cliente --------------------------------------
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) // teste
    try {
        // Extração dos dados do objeto
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        })
        await novoCliente.save() //save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Cliente cadastrado com sucesso",
            buttons: ['Ok']
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})
// ----------------------------------------------------------

//  CRUD Create fornecedor -------------------------------------
ipcMain.on('new-provider', async (event, fornecedor) => {
    console.log(fornecedor) // teste
    try {
        // Extração dos dados do objeto
        const novoFornecedor = new fornecedorModel({
            nomeFornecedor: fornecedor.nomeForn,
            cnpjFornecedor: fornecedor.cnpjForn,
            foneFornecedor: fornecedor.foneForn,
            emailFornecedor: fornecedor.emailForn,
            cepFornecedor: fornecedor.cepForn,
            logradouroFornecedor: fornecedor.logadouroForn,
            numeroFornecedor: fornecedor.numeroForn,
            bairroFornecedor: fornecedor.bairroForn,
            cidadeFornecedor: fornecedor.cidadeForn,
            ufFornecedor: fornecedor.ufForn,
            complementoFornecedor: fornecedor.complementoForn
        })
        await novoFornecedor.save() //save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Fornecedor cadastrado com sucesso",
            buttons: ['Ok']
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Aviso (Busca: Preenchimento do campo obrigatório)
ipcMain.on('dialog-infoSearchDialog', (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: "Atenção!",
        message: "Preencha o campo de busca",
        buttons: ['OK']
    })
    event.reply('focus-search')
})
// CRUD Read Cliente >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Recebimento do pedido de busca de um cliente pelo nome
ipcMain.on('search-client', async (event, nomeCliente) => {
    console.log(nomeCliente)
    // Busca no database
    try {
        // find() método de busca
        const dadosCliente = await clienteModel.find({ nomeCliente: new RegExp(nomeCliente, 'i') })
        console.log(dadosCliente)
        // UX - Se o cliente não estiver cadastrado, avisar o usuário e habilitar o cadastramento
        if (dadosCliente.length === 0) {
            dialog.showMessageBox({
                type: 'info',
                title: "Aviso!",
                message: "Cliente não encontrado. \nDeseja cadastrá-lo?",
                buttons: ['Sim', 'Não'],
                defaultId: 0
            }).then((result) => {
                if (result.response === 0) {
                    // setar o nome do cliente no campo e habilitar os botões
                    event.reply('name-client')
                } else {
                    // limpar o campo de pesquisa
                    event.reply('clear-search')
                }
            })
        } else {
            // Enviar os dados do cliente ao renderer
            event.reply('data-client', JSON.stringify(dadosCliente))
        }
    } catch (error) {
        console.log(error)
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read Fornecedor
ipcMain.on('search-provider', async (event, nomeFornecedor) => {
    console.log(nomeFornecedor)
    try {
        // find() método de busca
        const dadosFornecedor = await fornecedorModel.find({ nomeFornecedor: new RegExp(nomeFornecedor, 'i') })
        console.log(dadosFornecedor)
        if (dadosFornecedor.length === 0) {
            dialog.showMessageBox({
                type: 'info',
                title: "Aviso!",
                message: "Fornecedor não encontrado. \nDeseja cadastrá-lo?",
                buttons: ['Sim', 'Não'],
                defaultId: 0
            }).then((result) => {
                if (result.response === 0) {
                    event.reply('name-provider')
                } else {
                    // limpar o campo de pesquisa
                    event.reply('clear-search')
                }
            })
        } else {
            // Enviar os dados do cliente ao renderer
            event.reply('data-provider', JSON.stringify(dadosFornecedor))
        }
    } catch (error) {
        console.log(error)
    }
})

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD Update Cliente
ipcMain.on('update-client', async (event, cliente) => {
    console.log(cliente)
    try {
        // Extração dos dados do objeto
        const clienteEditado = await clienteModel.findByIdAndUpdate(
            cliente.idCli, {
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli
        },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Cliente atualizado com sucesso",
            buttons: ['Ok']
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})

// CRUD Update Fornecedor
ipcMain.on('update-provider', async (event, fornecedor) => {
    if(fornecedor.nomeForn === "" ||
    fornecedor.cnpjForn === "" ||
    fornecedor.foneForn === "" ||
    fornecedor.emailForn === "" ||
    fornecedor.cepForn === "" ||
    fornecedor.logradouroForn === "" ||
    fornecedor.numeroForn === "" ||
    fornecedor.bairroForn === "" ||
    fornecedor.cidadeForn === "" ||
    fornecedor.ufForn === ""
    ){
        dialog.showMessageBox({
            type:'error',
            title: "Atenção!",
            message: "Preencha os campos vazios"
        })
        return
    }
    console.log(fornecedor)
    try {
        // Extração dos dados do objeto
        const fornecedorEditado = await fornecedorModel.findByIdAndUpdate(
            fornecedor.idForn, {
            nomeFornecedor: fornecedor.nomeForn,
            cnpjFornecedor: fornecedor.cnpjForn,
            foneFornecedor: fornecedor.foneForn,
            emailFornecedor: fornecedor.emailForn,
            cepFornecedor: fornecedor.cepForn,
            logradouroFornecedor: fornecedor.logradouroForn,
            numeroFornecedor: fornecedor.numeroForn,
            bairroFornecedor: fornecedor.bairroForn,
            cidadeFornecedor: fornecedor.cidadeForn,
            ufFornecedor: fornecedor.ufForn,
            complementoFornecedor: fornecedor.complementoForn
        },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: "Aviso",
            message: "Fornecedor atualizado com sucesso",
            buttons: ['Ok']
        })
        event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// CRUD Delete Cliente
ipcMain.on('delete-client', (event, idCli) => {
    console.log(idCli)
    // Confirmação da ação antes de excluir
    dialog.showMessageBox({
        type: 'error',
        title: "Atenção!",
        message: "Deseja excluir este cliente? Essa é uma ação irreversível",
        buttons: ['Sim', 'Não'],
        defaultId: 0
    }).then(async (result) => {
        if (result.response === 0) {
            try {
                await clienteModel.findByIdAndDelete(idCli)
                dialog.showMessageBox({
                    type: 'info',
                    title: "Aviso",
                    message: "Cliente excluído com sucesso",
                    buttons: ['Ok']
                })
                event.reply('reset-form')
            } catch (error) {
                console.log(error)
            }
        }
    })
}
)
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// CRUD Delete Fornecedor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-provider', (event, idForn) => {
    console.log(idForn)
    // Confirmação da ação antes de excluir
    dialog.showMessageBox({
        type: 'error',
        title: "Atenção!",
        message: "Deseja excluir este fornecedor? Essa é uma ação irreversível",
        buttons: ['Sim', 'Não'],
        defaultId: 0
    }).then(async (result) => {
        if (result.response === 0) {
            try {
                await fornecedorModel.findByIdAndDelete(idForn)
                dialog.showMessageBox({
                    type: 'info',
                    title: "Aviso",
                    message: "Fornecedor excluído com sucesso",
                    buttons: ['Ok']
                })
                event.reply('reset-form')
            } catch (error) {
                console.log(error)
            }
        }
    })
}
)
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// ---------------------------------------
