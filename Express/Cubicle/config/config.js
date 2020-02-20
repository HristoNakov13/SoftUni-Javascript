const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbUrl: "mongodb://localhost:27017/cubicle"
    },
    production: {}
};

module.exports = config[env];
