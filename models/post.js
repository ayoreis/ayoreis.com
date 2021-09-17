'use strict'


const mongoose = require('mongoose')
const slugify = require('slugify')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
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

postSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    next()
})

module.exports = mongoose.model('Post', postSchema)
