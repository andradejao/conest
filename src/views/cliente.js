/**
 * Processo de renderização
 * clientes
 */

// Mudar propriedades do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// Função para manipular o evento Enter - (UX)
// function teclaEnter(event) {
//     if (event.key === 'Enter') {
//         event.preventDefault()
//         // Executar a função associada a função buscar
//         buscarCliente()
//     }
// }

// Adicionar a função de manipulação do evento da tecla Enter
// document.getElementById('frmCliente').addEventListener('keydown', teclaEnter)

// Função para remover o manipulador de eventos da tecla Enter
// function removerTeclaEnter() {
//     document.getElementById('frmCliente').removeEventListener('keydown', teclaEnter)
// }

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Captura dos valores de input do form
let formCliente = document.getElementById('frmCliente')
let idCliente = document.getElementById('inputId')
let nomeCliente = document.getElementById('inputName')
let foneCliente = document.getElementById('inputPhone')
let emailCliente = document.getElementById('inputAddress')

// Evento relacionado ao botão adicionar
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)

    // Enpacotamento dos dados em um objeto para envia-lo ao main.js
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)

    // Limpar os campos do form após o envio
    formCliente.reset()
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Array utilizado na renderização dos dados do cliente
let arrayCliente = []
// Função responsável por enviar ao main um pedido
// de busca dos dados de um cliente pelo nome
function buscarCliente() {
    let nomeCliente = document.getElementById('inputSearch').value.trim()
    // validação (UX)
    if (nomeCliente === "") {
        // validar campo obrigatório
        api.infoSearchDialog()
    } else {
        // Envio do pedido de busca junto com o nome do cliente
        api.searchClient(nomeCliente)
    }
    // Foco no campo de buscar (UX)
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })
    // Setar o nome do cliente e habilitar o cadastramento
    api.nameClient(async (args) => {
        // Restaurar o comportamento padrão da tecla Enter
        // removerTeclaEnter()
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputName').value += setarNomeCliente
        // Limpar os campos para um novo cadastro
        document.getElementById('inputPhone').value = ""
        document.getElementById('inputAddress').value = ""
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputId').value = ""
        // ---------------------------------------------
        btnCreate.disabled = false
        btnUpdate.disabled = true
        btnDelete.disabled = true
        btnRead.disabled = true
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputName').focus()
    })
    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // Receber os dados do cliente do main.js
    api.dataClient((event, dadosCliente) => {
        arrayCliente = JSON.parse(dadosCliente)
        console.log(arrayCliente)
        // Percorrer o array, extrair e setar os campos de input
        arrayCliente.forEach((c) => {
            document.getElementById('inputId').value = c._id
            document.getElementById('inputName').value = c.nomeCliente
            document.getElementById('inputPhone').value = c.foneCliente
            document.getElementById('inputAddress').value = c.emailCliente
            // limpar a caixa de busca (UX)
            document.getElementById('inputSearch').value = ""
            document.getElementById('inputSearch').disabled = true
            // ativar os botões update e delete
            document.getElementById('btnUpdate').disabled = false
            document.getElementById('btnDelete').disabled = false
        })
    })
    // arrayCliente = []
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarCliente() {
    const cliente = {
        idCli: idCliente.value,
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    console.log(cliente)
    // Enviar o objeto cliente ao main.js
    api.updateClient(cliente)
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirCliente() {
    let idCli = idCliente.value
    console.log(idCli)
    // Envio do id ao main.js
    api.deleteClient(idCli)
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Reset do formulário
api.resetForm((args) => {
    resetForm()
})

// Reset do formulário
function resetForm() {
    document.getElementById('inputSearch').disabled = false
    document.getElementById('inputName').value = ""
    document.getElementById('inputPhone').value = ""
    document.getElementById('inputAddress').value = ""
    document.getElementById('inputId').value = ""
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnDelete.disabled = true
    btnUpdate.disabled = true
    btnRead.disabled = false
    arrayCliente = []
    // document.getElementById("frmCliente").addEventListener("keydown", teclaEnter)
}