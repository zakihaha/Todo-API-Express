const mongoose = require('mongoose')
const { model, Schema } = mongoose

let todoSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        completed: {
            type: Boolean,
            default: false
        },
        due_date: {
            type: Date,
            required: [true, 'Due date is required']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Todo', todoSchema)