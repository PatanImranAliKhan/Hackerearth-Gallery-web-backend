const mongoose=require('mongoose')

const userschema=mongoose.Schema({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',userschema)