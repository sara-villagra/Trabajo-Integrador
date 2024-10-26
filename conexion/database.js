const { Sequelize } = require('sequelize')

process.loadEnvFile()
// const dotenv = require('dotenv')
// const path = require('path')
// dotenv.config({ path: path.join(__dirname, '.env') })
const { DBUSER, PASSWORD, HOST, DATABASE } = process.env

const sequelize = new Sequelize(DATABASE, DBUSER, PASSWORD, {
 host: HOST,
 dialect: 'mysql'
})

module.exports = { sequelize }
