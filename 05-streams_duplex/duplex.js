const fs = require("fs")
const { Duplex } = require("stream")


const streamLectura = fs.createReadStream( "./archivos/base.txt" )
const streamEscritura = fs.createWriteStream("./archivos/destino.txt")

streamLectura.setEncoding("utf8")

const reporte = new Duplex({
    write(data, encode, callback) {
        console.log(data)
        // this.push(data.toString().toUpperCase())
        /// para ver directamente el texto, reemplaza la llamada anterior por 
        // console.log(data.toString())
        callback()
    },
    read(size) {}
})


streamLectura.pipe(reporte).pipe(streamEscritura)
