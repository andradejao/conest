/**
 * Modelo de dados (model) Fornecedor
 */

const { model, Schema } = require('mongoose')

const fornecedorSchema = new Schema({
    nomeFornecedor: {
        type: String
    },
    cnpjFornecedor: {
        type: String
    },
    foneFornecedor: {
        type: String
    },
    emailFornecedor: {
        type: String
    },
    cepFornecedor: {
        type: String
    },
    logradouroFornecedor: {
        type: String
    },
    numeroFornecedor: {
        type: String
    },
    bairroFornecedor: {
        type: String
    },
    cidadeFornecedor: {
        type: String
    },
    ufFornecedor: {
        type: String
    },
    complementoFornecedor: {
        type: String
    },

})

module.exports = model('Fornecedor', fornecedorSchema)