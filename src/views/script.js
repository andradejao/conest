

function buscarCep() {
    let cep = (frmFornecedor.inputCep.value)
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`
    // apoio ao entendimento da logica
    // uso de promisse para recuperar os dados do webservices (API)
    fetch(urlAPI)
        .then((response) => { //obter os dados
            return response.json()
        })
        .then((dados) => { //manipular os dados obtidos
            frmFornecedor.inputLogradouro.value = `${dados.logradouro}`
            frmFornecedor.inputBairro.value = `${dados.bairro}`
            frmFornecedor.inputCidade.value = `${dados.localidade}`
        })
        .catch((error) => {
            console.log(`Erro ao obter o endereço: ${error}`)
        })
    }

// Determina valor máximo de caracteres para number
const inputCnpj = document.getElementById('inputCnpj')
inputCnpj.addEventListener('input', () => {
    if (inputCnpj.value.length > 15) {
        inputCnpj.value = inputCnpj.value.slice(0, 15)
    }
})

// Determina valor máximo de caracteres para number
const inputPhone = document.getElementById('inputPhone')
inputPhone.addEventListener('input', () => {
    if (inputPhone.value.length > 15) {
        inputPhone.value = inputPhone.value.slice(0, 15)
    }
})
