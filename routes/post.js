const express = require('express')
const fs = require('fs')
const Post = require('../models/post')
const router = express.Router()
const sha512 = require('js-sha512');

let config
const configFile = './config.json'

fs.readFile(configFile, (error, data) => {
    if (error !== null) throw error

    config = JSON.parse(data)
})


router.get('/post', (request, response) => {
    response.render('post', {title: "Post.", scripts: ['create.js']})
})

router.get('/posts', (request, response) => {
    Post.find().sort({ createdAt: -1 })

    .then(result => {
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


router.post('/posts', (request, response) => {
    if (typeof request.body.password === 'string' && sha512(request.body.password) === config.password) {
        const post = new Post({
            title: request.body.title,
            description: request.body.description,
            content: request.body.content
        })

        post.save()

        .then(console.log)

        .catch(console.error)
    } else {
        console.error(`⚠️ Authenticate first! https://ayoreis.com/authenticate`)
    }
})


router.get('/posts/:id', (request, response) => {
    const id = request.params.id

    Post.findById(id)

    .then( result => {
        response.render('single', {title: result.title, post: result})
    })

    .catch(console.error)
})

router.delete('/posts/:id', (request, response) => {
    const id = request.params.id

    if (typeof request.body.password === 'string' && sha512(request.body.password) === config.password) {
        Post.findByIdAndDelete(id)

        .then(console.log)

        .catch(console.error)
    } else {
        console.error(`⚠️ Authenticate first! https://ayoreis.com/authenticate`)
    }
})

module.exports = router
