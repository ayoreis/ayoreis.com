'use strict'



const fs = require('fs');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

fs.readFile('./authentication.json', (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    const authentication = JSON.parse(data)

    const Post = mongoose.model(authentication.collection, postSchema) //

    module.exports = Post
})
