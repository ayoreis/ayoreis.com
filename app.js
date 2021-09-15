'use strict'



const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const postRouter = require('./routes/post.js')
const sha512 = require('js-sha512')

const app = express()

// Settings
app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))



// Routes
app.get('/', (request, response) => {
    response.render('index', {title: "Ayo Reis."})
})

app.get('/about', (request, response) => {
    response.render('about', {title: "About."})
})

app.use(postRouter)



// Setup, Authentication, & Database
const configFile = './config.json'

fs.readFile(configFile, (error, data) => {
    if (error !== null) throw error

    const config = JSON.parse(data)
})

let authentication, databaseURI

fs.readFile('./authentication.json', (error, data) => {
    if (error !== null) throw error

    authentication = JSON.parse(data)
    databaseURI = `mongodb+srv://${authentication.user}:${authentication.password}@cluster.alfss.mongodb.net/${authentication.database}?retryWrites=true&w=majority`

    mongoose.connect(databaseURI)

    .then(() => {
        app.listen(3000)
    })
})
