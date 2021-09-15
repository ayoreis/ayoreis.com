'use strict'


const fs = require('fs')

const express = require('express')
const mongoose = require('mongoose')
const sha512 = require('js-sha512')

const postRoutes = require('./routes/post.js')

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

app.use(postRoutes)


// Setup, Authentication, & Database
let config

app.get('/authenticate', (request, response) => {
    response.render('authenticate', {title: "🕵️ Authenticate."})
})

app.post('/authenticate', (request, response) => {
    const password = sha512(request.body.password)

    if (config.password === password) {
        console.log("Rigth password!")
    }

    response.redirect('/authenticate')
})

const configFile = './config.json'

fs.readFile(configFile, (error, data) => {
    if (error !== null) throw error

    config = JSON.parse(data)
    const databaseURI = `mongodb+srv://${config.database.user}:${config.database.password}@cluster.alfss.mongodb.net/${config.database.database}?retryWrites=true&w=majority`

    mongoose.connect(databaseURI)

    .then(() => {
        app.listen(3000)
    })
})
