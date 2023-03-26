const express = require('express')
const cookieParser = require('cookie-parser')
const productsRouter = require('./routes/productos.router')
const cartRouter = require('./routes/cart.router')

const app = express()
const PORT = 4000

const mid2 = (req, res, next)=>{
    req.dato2 = 'dato 2'
    next()
}

// habdelbars config _______________________________________________________
const handlebars = require('express-handlebars')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine','handlebars' )

// habdelbars config _______________________________________________________
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static(__dirname + '/public'))
app.use(cookieParser())// mid Tercero

app.use( (req, res, next)=>{
    console.log('Time', Date.now())
    next()
} )

app.use('/api/productos', mid2, productsRouter)
app.use('/api/carrito', cartRouter)

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

app.listen(PORT, (err) => {
    if (err) return console.log('Error al iniciar el servidor')

    console.log(`Servidor iniciado en el puerto ${PORT}`)
})