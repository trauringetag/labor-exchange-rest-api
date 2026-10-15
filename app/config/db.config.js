module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "labor_user",
    PASSWORD: process.env.DB_PASSWORD || "labor_pass",
    DATABASE: process.env.DB_NAME || "labor_exchange",
    PORT: process.env.DB_PORT || 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};