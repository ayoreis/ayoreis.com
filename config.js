'use strict'


const fs = require('fs');


let config
const configFile = './config.json'

fs.readFile(configFile, (error, data) => {
    if (error !== null) throw error

    config = JSON.parse(data)
})

module.exports = config
