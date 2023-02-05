const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


const userRouter = Router();

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        where: {
            username,
        },
    });

    if (!user) {
        res.status(403).json({ message: 'Incorrect username or password, please try again' });
        return;
    }

    if (user.password !== password) {
        res.status(403).json({ message: 'Incorrect username or password, please try again' });
        return;
    }

    // res.json(user);


    // This is the data we will be sending to the client
    const tokenData = {
        id: user.id,
        role: 'user',
    };

    // This is the secret key that we will use to sign our JWT
    const token = jwt.sign(
        tokenData,
        process.env.JWT_KEY,
        {
            expiresIn: 60 * 60 * 2
        }
    );

    // This is the cookie we will be sending to the client
    res.cookie(
        'session_token', 
        token, 
        { 
            maxAge: 60 * 60 * 2 * 1000 
        });
    
    
    
    res.status(200).end();

});

userRouter.get('/me', async (req, res) => {
    console.log(req.cookies);
});

module.exports = userRouter;