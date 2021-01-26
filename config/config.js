module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "dungeon_scribe",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    useEnvVariable: "JAWS_URL",
    dialect: "mysql",
  },
};
