const fs = require("fs")
const streamEscritura = fs.createWriteStream("./archivos/mi_archivo.txt")
const EventEmitter = require('events')

class Emisor extends EventEmitter {}

const miEmisor = new Emisor()

function escribirEnArchivo() {

    let iteraciones = 5

    for (let i = 0; i < iteraciones; i++) {
        streamEscritura.write(`Iteración #${i}\n`)
    }

    streamEscritura.write(`======= FIN =======`)
    streamEscritura.end()
}


function notificarPorCorreo() {

    console.log("preparando correo")

    setTimeout(
        () => {
            miEmisor.emit("correoOK")
            miEmisor.emit("eventoDos")
         }
        , 10000
    )
}

function leerDocumento() {
    fs.readFile('./archivos/mi_archivo.txt', (error, documento) => {
        console.log(documento.toString())
    })


}


streamEscritura.on('close', () => {
    notificarPorCorreo()
})

console.time('correoOK')
miEmisor.on("correoOK", ()=>{
    leerDocumento()
})
console.timeEnd('correoOK')

console.time('eventoDos')
miEmisor.on("eventoDos", ()=>{
    console.log('tengo un evento')
})
console.timeEnd('eventoDos')
escribirEnArchivo()








