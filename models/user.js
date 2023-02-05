const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
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
        hooks: {
            beforeCreate: async (newUserData) => {
                console.log(newUserData);
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            },
        },
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    },
);

module.exports = User;