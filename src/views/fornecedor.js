/**
 * Processo de renderização
 * fornecedores
 */

// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Captura dos valores de input do form
let formFornecedor = document.getElementById('frmFornecedor')
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
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<