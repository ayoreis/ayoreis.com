`use strict`


// Packages.
const fs = require(`fs`)

const express = require(`express`)
const mongoose = require(`mongoose`)
const sha512 = require(`js-sha512`)
const cookieParser = require('cookie-parser')

// Variables.
const app = express()

const config = {
    user: process.argv[2],
    password: process.argv[3]
}


// Settings.
app.set(`view engine`, `ejs`)


// Middleware.
app.use(cookieParser())
app.use(express.json())
app.use(express.raw())
app.use(express.static(`public`))
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


// Routes.
app.get(`/`, (request, response) => {
    response.render(`index`, { icon: `🌈`, title: "Ayo Reis." })
})

app.use(`/`, (request, response) => {
    response.status(404)
    response.render(`404`, { icon: `🤯`, title: `404.` })
})

const string = `mongodb+srv://${config.user}:${config.password}@cluster.alfss.mongodb.net/types?retryWrites=true&w=majority`

// mongoose.model(`Type`, require(`./models/`))

mongoose.connect(string)

    .then(() => {
        app.listen(3000)
    })