const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')

let authentication, dbURI

fs.readFile('./authentication.json', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    authentication = JSON.parse(data)
    dbURI = `mongodb+srv://${authentication.user}:${authentication.password}@cluster.alfss.mongodb.net/${authentication.database}?retryWrites=true&w=majority`

    mongoose.connect(dbURI)
})



const app = express()

app.set('view engine', 'ejs')

app.listen(3000)



app.get('/', (request, response) => {
    response.render('index')
})
