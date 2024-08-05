/**
 * Módulo de conexão com o database
 * Uso do framework mongoose
 */

// Importação da biblioteca
const mongoose = require('mongoose')

// Definição do database (compass)
let url = "mongodb+srv://admin:senac123@clusterconest.ehn5bpp.mongodb.net/dbconest"

let isConnected = false

// Status da conexão
const dbStatus = async () => {
    if (isConnected === false) {
        await conectar()
    }
}

// Conectar
const conectar = async () => {
    // se não estiver conectado
    if (isConnected === false) {
        try {
            await mongoose.connect(url)
            isConnected = true
            console.log("Sucesso! MongoDB conectado")
            return isConnected
        } catch (error) {
            console.log(`Problema detectado: ${error.message}`)
        }
    }
}

// Desconectar
const desconectar = async () => {
    if (isConnected === true) {
        try {
            await mongoose.disconnect(url)
            isConnected = false
            console.log("MongoDB desconectado")
        } catch (error) {
            console.log(`Problema detectado: ${error.message}`)
        }
    }
}

// Exportação dos métodos para o main
module.exports = { dbStatus, desconectar }
