require("dotenv").config();
module.exports = {
  development: {
    username: process.env.USERNAME || "root",
    password: process.env.PASSWORD,
    storage: "database.sqlite",
    dialect: "sqlite",
    dialectOptions: {
      multipleStatements: true
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  }
};
