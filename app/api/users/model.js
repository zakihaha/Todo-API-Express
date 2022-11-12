const mongoose = require('mongoose')
const { model, Schema } = mongoose

let userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)