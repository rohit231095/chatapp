const env = {
    database: 'DB-Name',
    username: 'DB-User',
    password: 'DB-Pass',
    host: 'DB-Host',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
};

module.exports = env;