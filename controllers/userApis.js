const {Router} = require('express');

const {User} = require('../models');

const userRouter = Router();

userRouter.post('/login', async (req, res) => { 
    const {username, password} = req.body;

    const user = await User.findOne({
        where: {
            username,
        },
    });

    if (!user) {
        res.status(404).json({message: 'Incorrect username or password, please try again'});
        return;
    }

    if (user.password !== password) {
        res.status(403).json({message: 'Incorrect username or password, please try again'});
        return;
    }

});

userRouter.get('/me', async (req, res) => {
});

module.exports = userRouter;