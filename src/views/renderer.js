// Função que é executada ao clicar o botão
function cliente() {
    api.openClientes()
}

function fornecedor() {
    api.openFornecedores()
}

function produto() {
    api.openProdutos()
}

function relatorio() {
    api.openRelatorios()
}

// Alteração do ícone do status do database
api.dbMessage((event, message) => {
    console.log(message)
    if (message === "conectado") {
        document.getElementById('statusDb').src = "../public/img/dbon.png"
    } else {
        document.getElementById('statusDb').src = "../public/img/dboff.png"
    }
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
document.getElementById('dataAtual').innerHTML = obterData()