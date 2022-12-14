require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const verifyToken = require('./app/middlewares/verifyToken');

const todosRouter = require('./app/api/todos/router');
const usersRouter = require('./app/api/users/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API for Todo App by Muh Zaki Choiruddin');
});

app.use('/api/todos', verifyToken, todosRouter);
app.use('/api', usersRouter);

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        )
    ).catch((err) =>
        console.log(err.message)
    )