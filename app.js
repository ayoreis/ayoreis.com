const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')

app.listen(3000)



app.get('/', (request, response) => {
    response.render('index')
})
