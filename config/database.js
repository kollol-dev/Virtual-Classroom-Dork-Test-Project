"use strict";
const Env = use("Env");
const Helpers = use("Helpers");

module.exports = {
  // Default Connection
  connection: Env.get("DB_CONNECTION", "mysql"),

  // Mysql
  // npm i --save mysql
  
  mysql: {
    client: "mysql",
    connection: {
      host: Env.get("DB_HOST", "localhost"),
      port: Env.get("DB_PORT", ""),
      user: Env.get("DB_USER", "root"),
      password: Env.get("DB_PASSWORD", ""),
      database: Env.get("DB_DATABASE", "adonis"),
    },
    debug: Env.get("DB_DEBUG", false),
  },
};
