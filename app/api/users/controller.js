const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const User = require('./model');
const RefreshToken = require('../refreshTokens/model');

const {
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(StatusCodes.CONFLICT).json({
                message: 'Email already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(StatusCodes.CREATED).json({
            message: 'User created successfully'
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'User not found',
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Email or password is incorrect',
            });
        }

        const accessToken = jwt.sign(
            { user },
            JWT_SECRET,
            { expiresIn: JWT_ACCESS_TOKEN_EXPIRED }
        );

        const refreshToken = jwt.sign(
            { user },
            JWT_SECRET_REFRESH_TOKEN,
            { expiresIn: JWT_REFRESH_TOKEN_EXPIRED }
        );

        await RefreshToken.create({ token: refreshToken, user: user._id });

        return res.status(StatusCodes.OK).json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
}

module.exports = { register, login };