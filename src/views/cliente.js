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

// Alterar comportamento da tecla Enter dentro do formulário (UX)
document.getElementById('frmCliente').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        // Executar a função associada a função buscar
        buscarCliente()
    }
})

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Captura dos valores de input do form
let formCliente = document.getElementById('frmCliente')
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
    api.nameClient((args) => {
        let setarNomeCliente = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputName').value = setarNomeCliente
        document.getElementById('inputSearch').value = ""
        btnCreate.disabled = false
        btnUpdate.disabled = false
        btnDelete.disabled = false
        btnRead.disabled = true
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputName').focus()
    })
    api.clearSearch((args) => {
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })

}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


// Reset do formulário
function resetForm() {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    btnRead.disabled = false
    document.getElementById('inputSearch').disabled = false
}