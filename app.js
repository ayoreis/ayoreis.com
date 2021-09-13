'use strict'



const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const Post = require('./models/post')

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



// Post routes

app.get('/post', (request, response) => {
    response.render('post', {title: "Post."})
})

app.get('/posts', (request, response) => {
    Post.find().sort({ createdAt: -1 })

    .then( result => {
        response.render(
            'posts',
            {
                title: "Posts.",
                posts: result,
                scripts: ['delete.js']
            }
        )
    })

    .catch(console.error)
})

app.post('/posts', (request, response) => {
    const post = new Post(request.body)

    post.save()

    .then(() => {
        response.redirect('/posts')
    })

    .catch(console.error)
})

app.get('/posts/:id', (request, response) => {
    const id = request.params.id

    Post.findById(id)

    .then( result => {
        response.render('single', {title: result.title, post: result})
    })

    .catch(console.error)
})

app.delete('/posts/:id', (request, response) => {
    const id = request.params.id

    Post.findByIdAndDelete(id)

    .then( result => {
        response.json({redirect: '/posts'})
    })

    .catch(console.error)
})


// Database
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
