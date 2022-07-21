const mongoose = require('mongoose')

const imageschema = mongoose.Schema({
    userEmail: {
        type: String
    },
    ImgName : {
        type: String,
        required: true
    },
    ImgUrl : {
        type: String,
        required: true
    },
    ImgDetails : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Image',imageschema);