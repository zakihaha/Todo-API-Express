const Todo = require('./model')
const { StatusCodes } = require('http-status-codes');

const index = async (req, res) => {
    console.log(req.user._id);
    try {
        const todos = await Todo.find({ user: req.user._id })
        res.status(StatusCodes.OK).json({
            data: todos
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const show = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (!todo) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Todo not found'
            })
        }

        if (todo.user != req.user._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'unauthorized'
            })
        }

        res.status(StatusCodes.OK).json({
            data: todo
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const store = async (req, res) => {
    try {
        const todo = await Todo.create({
            ...req.body,
            user: req.user._id
        })
        res.status(StatusCodes.CREATED).json({
            data: todo
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!todo) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Todo not found'
            })
        }

        if (todo.user != req.user._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'unauthorized'
            })
        }

        res.status(StatusCodes.OK).json({
            data: todo
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const destroy = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        
        if (!todo) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Todo not found'
            })
        }

        if (todo.user != req.user._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'unauthorized'
            })
        }

        res.status(StatusCodes.OK).json({
            data: todo
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const destroyAll = async (req, res) => {
    try {
        await Todo.deleteMany({ user: req.user._id })
        res.status(StatusCodes.OK).json({
            message: 'success delete all todos'
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

const changeStatus = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        
        if (!todo) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'Todo not found'
            })
        }
        
        if (todo.user != req.user._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'unauthorized'
            })
        }

        todo.completed = !todo.completed
        await todo.save()
        res.status(StatusCodes.OK).json({
            data: todo
        })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
}

module.exports = { index, show, store, update, destroy, destroyAll, changeStatus }