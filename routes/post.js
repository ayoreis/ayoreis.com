const express = require('express')
const fs = require('fs')
const Post = require('../models/post')
const router = express.Router()
const sha512 = require('js-sha512')

const config = JSON.parse(fs.readFileSync('./config.json'))

router.get('/post', (request, response) => {
    response.render('post', {title: "Post.", scripts: ['create.js']})
})

router.post('/posts', (request, response) => {
    if (typeof request.body.password === 'string' && sha512(request.body.password) === config.password) {
        const post = new Post({
            title: request.body.title,
            description: request.body.description,
            content: request.body.content
        })

        post.save()

        .then()

        .catch(console.error)
    } else {
        console.error(`⚠️ Authenticate first! https://ayoreis.com/authenticate`)
    }
})

router.get('/posts/:slug', (request, response) => {
    Post.findOne({slug: request.params.slug})

    .then(result => {
        response.render('single', {title: result[0].title, post: result})
    })

    .catch(console.error)
})

router.delete('/posts/:slug', (request, response) => {

    if (typeof request.body.password === 'string' && sha512(request.body.password) === config.password) {
        Post.find({slug: request.params.slug}).remove()

        .then()

        .catch(console.error)
    } else {
        console.error(`⚠️ Authenticate first! https://ayoreis.com/authenticate`)
    }
})

module.exports = router
