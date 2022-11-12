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
app.use(cors({
    origin: 'http://localhost:8081'
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/todos', verifyToken, todosRouter);
app.use('/api', usersRouter);

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)
// mongoose.connect(process.env.MONGO_URL)
//     .then(() =>
//     ).catch((err) =>
//         console.log(err.message)
//     )