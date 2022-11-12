const mongoose = require('mongoose')
const { model, Schema } = mongoose

let refreshTokenSchema = Schema(
    {
        token: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('RefreshToken', refreshTokenSchema)