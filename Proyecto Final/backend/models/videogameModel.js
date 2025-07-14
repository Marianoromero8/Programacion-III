const { sequelize } = require('./index');
const { DataTypes } = require('sequelize')

const Videogame = sequelize.define('Videogame', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.ENUM('Completed', 'In Progress', 'Pending'),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
},
{
  tableName: 'videogames',
  timestamps: true,
})

module.exports = Videogame