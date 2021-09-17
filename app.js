'use strict'


// Packages.
const fs = require('fs')

const express = require('express')
const mongoose = require('mongoose')
const sha512 = require('js-sha512')

const postRoutes = require('./routes/post.js')


// Variables.
const app = express()

const config = JSON.parse(fs.readFileSync('./config.json'))


// Settings.
app.set('view engine', 'ejs')


// Middleware.
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.text())

const Post = require('./models/post')


// Routes.
app.get('/', (request, response) => {
    Post.find().sort({ createdAt: -1 })

    .then(result => {
        response.render('index', {title: "Ayo Reis.", posts: result, scripts: ['delete.js']})
    })

    .catch(console.error)
})

app.get('/about', (request, response) => {
    response.render('about', {title: "About."})
})

app.use(postRoutes)


// Authentication & Database.
app.get('/authenticate', (request, response) => {
    response.render('authenticate', {title: "🕵️ Authenticate.", scripts: ['auth.js']})
})


app.post('/authenticate', (request, response) => {
    response.send(sha512(request.body) === config.password)
})

app.use('/', (request, response) => {
    response.status(404)
    response.render('404', {title: "404.", url: request.path})
})

const databaseURI = `mongodb+srv://${config.database.user}:${config.database.password}@cluster.alfss.mongodb.net/${config.database.database}?retryWrites=true&w=majority`

mongoose.connect(databaseURI)

.then(() => {
    app.listen(3000)
})
