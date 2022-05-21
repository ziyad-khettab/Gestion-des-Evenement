const User = require('./User');
const Club = require('./Club');
const Sequelize = require('sequelize');
const connectDB = require('../config/db')
const sequelize = connectDB.getConnexion()

const Role = sequelize.define('role',
    {
        id_role : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true,
        },
        id_user : {
            type : Sequelize.INTEGER,
            allowNull : false,
            onDelete: "CASCADE",
            references : {
                model : User,
                key : "id_user",
            }
        },
        id_club : {
            type : Sequelize.INTEGER,
            allowNull : false,
            onDelete: "CASCADE",
            references :{
                model : Club,
                key : "id",
            }
        },
        role :{
            type : Sequelize.STRING(50),
            allowNull : false,
        }
    },
    {
        indexes : [
            {
                unique : true,
                fields : ['id_user', 'id_club']
            }
        ]
    }
)
module.exports = Role;