const express = require('express')
const Post = require('../models/post')
const router = express.Router()

router.get('/post', (request, response) => {
    response.render('post', {title: "Post."})
})

router.get('/posts', (request, response) => {
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

router.post('/posts', (request, response) => {
    const post = new Post(request.body)

    post.save()

    .then(() => {
        response.redirect('/posts')
    })

    .catch(console.error)
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

    Post.findByIdAndDelete(id)

    .then( result => {
        response.json({redirect: '/posts'})
    })

    .catch(console.error)
})

module.exports = router
