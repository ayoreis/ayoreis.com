'use strict'



const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const Blog = require('./models/post')

const app = express()
app.set('view engine', 'ejs')

let authentication, databaseURI

fs.readFile('./authentication.json', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    authentication = JSON.parse(data)
    databaseURI = `mongodb+srv://${authentication.user}:${authentication.password}@cluster.alfss.mongodb.net/${authentication.database}?retryWrites=true&w=majority`

    mongoose.connect(databaseURI)
    .then(() => {
        app.listen(3000)
    })
})

app.get('/post', (request, response) => {

})

app.get('/', (request, response) => {
    response.render('index')
})
