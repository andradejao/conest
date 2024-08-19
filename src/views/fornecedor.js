/**
 * Processo de renderização
 * fornecedores
 */

// Mudar propriedades do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
})

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Captura dos valores de input do form
let formFornecedor = document.getElementById('frmFornecedor')
let idFornecedor = document.getElementById('inputId')
let nomeFornecedor = document.getElementById('inputName')
let cnpjFornecedor = document.getElementById('inputCnpj')
let foneFornecedor = document.getElementById('inputPhone')
let emailFornecedor = document.getElementById('inputAddress')
let cepFornecedor = document.getElementById('inputCep')
let logradouroFornecedor = document.getElementById('inputLogradouro')
let numeroFornecedor = document.getElementById('inputNumero')
let bairroFornecedor = document.getElementById('inputBairro')
let cidadeFornecedor = document.getElementById('inputCidade')
let ufFornecedor = document.getElementById('uf')
let complementoFornecedor = document.getElementById('inputComplemento')

// Evento relacionado ao botão adicionar
formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(formFornecedor.value, nomeFornecedor.value, cnpjFornecedor.value, foneFornecedor.value,
        emailFornecedor.value, cepFornecedor.value, logradouroFornecedor.value, numeroFornecedor.value,
        bairroFornecedor.value, cidadeFornecedor.value, ufFornecedor.value, complementoFornecedor.value)

    // Enpacotamento dos dados em um objeto para envia-lo ao main.js
    const fornecedor = {
        nomeForn: nomeFornecedor.value,
        cnpjForn: cnpjFornecedor.value,
        foneForn: foneFornecedor.value,
        emailForn: emailFornecedor.value,
        cepForn: cepFornecedor.value,
        logadouroForn: logradouroFornecedor.value,
        numeroForn: numeroFornecedor.value,
        bairroForn: bairroFornecedor.value,
        cidadeForn: cidadeFornecedor.value,
        ufForn: ufFornecedor.value,
        complementoForn: complementoFornecedor.value
    }
    api.newProvider(fornecedor)

    // Limpar os campos do form após o envio
    formFornecedor.reset()
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let arrayFornecedor = []

function buscarFornecedor() {
    let nomeFornecedor = document.getElementById('inputSearch').value.trim()

    if (nomeFornecedor === "") {
        api.infoSearchDialog()
    } else {
        api.searchProvider(nomeFornecedor)
    }
    api.focusSearch((args) => {
        document.getElementById('inputSearch').focus()
    })
    api.nameProvider(async (args) => {
        let setarNomeFornecedor = document.getElementById('inputSearch').value.trim()
        document.getElementById('inputName').value += setarNomeFornecedor
        // Limpar os campos para um novo cadastro
        document.getElementById('inputCnpj').value = ""
        document.getElementById('inputPhone').value = ""
        document.getElementById('inputAddress').value = ""
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputId').value = ""
        document.getElementById('inputCep').value = ""
        document.getElementById('inputLogradouro').value = ""
        document.getElementById('inputNumero').value = ""
        document.getElementById('inputBairro').value = ""
        document.getElementById('inputCidade').value = ""
        document.getElementById('uf').value = ""
        document.getElementById('inputComplemento').value = ""
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
    api.dataProvider((event, dadosFornecedor) => {
        arrayFornecedor = JSON.parse(dadosFornecedor)
        console.log(arrayFornecedor)
        // Percorrer o array, extrair e setar os campos de input
        arrayFornecedor.forEach((p) => {
            document.getElementById('inputId').value = p._id
            document.getElementById('inputName').value = p.nomeFornecedor
            document.getElementById('inputCnpj').value = p.cnpjFornecedor
            document.getElementById('inputAddress').value = p.emailFornecedor
            document.getElementById('inputPhone').value = p.foneFornecedor
            document.getElementById('inputCep').value = p.cepFornecedor
            document.getElementById('inputLogradouro').value = p.logradouroFornecedor
            document.getElementById('inputNumero').value = p.numeroFornecedor
            document.getElementById('inputBairro').value = p.bairroFornecedor
            document.getElementById('inputCidade').value = p.cidadeFornecedor
            document.getElementById('uf').value = p.ufFornecedor
            document.getElementById('inputComplemento').value = p.complementoFornecedor
            // limpar a caixa de busca (UX)
            document.getElementById('inputSearch').value = ""
            document.getElementById('inputSearch').disabled = true
            // ativar os botões update e delete
            document.getElementById('btnUpdate').disabled = false
            document.getElementById('btnDelete').disabled = false
        })
    })
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function editarFornecedor() {
    const fornecedor = {
        idForn: idFornecedor.value,
        nomeForn: nomeFornecedor.value,
        cnpjForn: cnpjFornecedor.value,
        foneForn: foneFornecedor.value,
        emailForn: emailFornecedor.value,
        cepForn: cepFornecedor.value,
        logadouroForn: logradouroFornecedor.value,
        numeroForn: numeroFornecedor.value,
        bairroForn: bairroFornecedor.value,
        cidadeForn: cidadeFornecedor.value,
        ufForn: ufFornecedor.value,
        complementoForn: complementoFornecedor.value
    }
    console.log(fornecedor)
    // Enviar o objeto fornecedor ao main.js
    api.updateProvider(fornecedor)
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirFornecedor() {
    let idForn = idFornecedor.value
    console.log(idForn)
    // Envio do id ao main.js
    api.deleteProvider(idForn)
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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
    document.getElementById('inputCnpj').value = ""
    document.getElementById('inputCep').value = ""
    document.getElementById('inputLogradouro').value = ""
    document.getElementById('inputNumero').value = ""
    document.getElementById('inputBairro').value = ""
    document.getElementById('inputCidade').value = ""
    document.getElementById('uf').value = ""
    document.getElementById('inputComplemento').value = ""
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnDelete.disabled = true
    btnUpdate.disabled = true
    btnRead.disabled = false
    arrayFornecedor = []
}