const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const becrypt = require('bcrypt');


const userRouter = Router();


// Create a new user
userRouter.post('/', async (req, res) => {

    const { username, password } = req.body;



    const user = await User.findOne({
        where: {
            username,
        },
    });


    if (user) {
        res.status(409).json({ message: 'Username already exists' });
        return;
    }




    const encryptedPassword = await becrypt.hash(password, 10);


    const newUser = await User.create({
        username,
        password: encryptedPassword,
    });

    res.status(200).json(
        {id: newUser.id,}
        );
});





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
    // console.log(req.cookies);

    const { session_token } = req.cookies;

    try {
        const userData = jwt.verify(session_token, process.env.JWT_KEY);
        console.log(userData);
        
        const user = await User.findByPk(userData.id);
        const userSimple = user.get({ plain: true });
        delete userSimple.password;

        res.json(userSimple);
        console.log(userSimple);

    } catch (err) {
        res.status(403).json({ message: 'Bad Login' });
        return;
    }


});

module.exports = userRouter;