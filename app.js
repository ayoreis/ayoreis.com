'use strict'



const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const Post = require('./models/post')

const app = express()
app.set('view engine', 'ejs')

app.use((request, response, next) => {
    express.static('/public')
    
    next()
})

app.get('/', (request, response) => {
    response.render('index')
})



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
