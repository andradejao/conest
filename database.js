/**
 * Módulo de conexão com o database
 * Uso do framework mongoose
 */

// Importação da biblioteca
const mongoose = require('mongoose')

// Definição do database (compass)
let url = "mongodb://admin:pti%402018@10.26.45.203:27017/?authSource=admin"

// Conectar
const conectar = async () => {
    try {
        await mongoose.connect(url)
        console.log("Sucesso! MongoDB conectado")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}

// Desconectar
const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("MongoDB desconectado")
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}

// Exportação dos métodos para o main
module.exports = { conectar, desconectar }
