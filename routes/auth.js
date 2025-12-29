const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

//register with email/password
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all fields'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        //check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        //creating new user if the user doesn't exist
        console.log('Creating user: ', { name, email, password: '***' });

        const user = new User({ name, email, password });
        console.log('Before save- password length:', user.password?.length);

        await user.save();
        console.log('User saved successfully');


        //generate token 
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Register error', error);
        res.status(500).json({
            success: false,
            message: 'server error'
        });
    }
});


//login with email 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        //searching the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'invalid email or password'
            });
        }

        //checking if the user signed up with google
        if (user.googleId && !user.password) {
            return res.status(401).json({
                success: false,
                message: 'please sign in with Google'
            });
        }

        //check the password
        console.log('🔍 Attempting password check...');
        console.log('Password from request:', password);
        console.log('Hashed password in DB:', user.password);
        const isSame = await user.comparePassword(password);
        if (!isSame) {
            return res.status(401).json({
                success: false,
                message: 'invalid email or password'
            });
        }

        //generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Login successfull',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error', error);
        res.status(500).json({
            success: false,
            message: 'server error'
        });
    }
});


//google sign in (save user from firebase to mongodb)
router.post('/google', async (req, res) => {
    try {
        const { email, name, googleId } = req.body;

        //validation
        if (!email || !name || !googleId) {
            return res.status(400).json({
                success: false,
                message: 'missing google data'
            });
        }


        //check if the user exists
        let user = await User.findOne({ email });

        if (!user) {
            //create new user with google data
            user = new User({
                name,
                email,
                googleId
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        //generate token
        const token = generateToken(user._id);


        res.status(200).json({
            success: true,
            message: 'Google sign-in successfull',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Google error', error);
        res.status(500).json({
            success: false,
            message: 'server error'
        });
    }
});


//get current user
router.get('/me', async (req, res) => {
    try {
        //getting token from header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'no token'
            });
        }

        //verify the token
        const verifyToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(verifyToken.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('verification error', error);
        res.status(401).json({
            success: false,
            message: 'invalid token'
        });
    }
});


module.exports = router;