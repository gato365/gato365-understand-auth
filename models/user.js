const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
    },
);

module.exports = User;