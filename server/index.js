const express = require('express')
const mongoose = require('mongoose')
const  animesRouter = require('./routes/animes.routes')
var cors = require('cors')


const PORT = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api',animesRouter)



const server = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:jx8lmu23@animes.f5ujx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(PORT, () => {
            console.log(`Server started - port:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

server()