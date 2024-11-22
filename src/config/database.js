require('dotenv').config();
module.exports = {
    dialect: 'mysql',
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    username: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
    define: {
        timestamp: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    dialectOptions: {
        timezone: '+02:00',
    },
    timezone: '+02:00',
};