const mongoose = require(`mongoose`)

const schema = new mongoose.Schema({
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
    },

    family: {
        child,
        parent,
        tags: {
            type: [ mongoose.Schema.Types.ObjectId ],
            ref: `Tag`
        }
        
    }

}, { timestamps: true })

module.exports = mongoose.model(`Type`, schema)
