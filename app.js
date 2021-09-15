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
const configFile = './config.json'

fs.readFile(configFile, (error, data) => {
    if (error !== null) throw error

    const config = JSON.parse(data)
    const databaseURI = `mongodb+srv://${config.user}:${config.password}@cluster.alfss.mongodb.net/${config.database}?retryWrites=true&w=majority`

    mongoose.connect(databaseURI)

    .then(() => {
        app.listen(3000)
    })
})
