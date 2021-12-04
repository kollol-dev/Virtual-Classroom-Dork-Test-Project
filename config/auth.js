"use strict";
const Env = use("Env");

module.exports = {
  // Defalt authenticator plugin is Admin.
  authenticator: "admin",

  // Authenticator Plugin for Admin
  // Model: App/Models/Admin
  admin: {
    serializer: "lucid",
    model: "App/Models/Admin",
    scheme: "jwt",
    uid: "email",
    password: "password",
    options: {
      secret: Env.get("APP_KEY"),
    },
  },

  // Authenticator Plugin for Teacher
  // Model: App/Models/Teacher
  teacher: {
    serializer: "lucid",
    model: "App/Models/Teacher",
    scheme: "jwt",
    uid: "email",
    password: "password",
    options: {
      secret: Env.get("APP_KEY"),
    },
  },

  // Authenticator Plugin for Studnet
  // Model: App/Models/Studnet
  student: {
    serializer: "lucid",
    model: "App/Models/Student",
    scheme: "jwt",
    uid: "email",
    password: "password",
    options: {
      secret: Env.get("APP_KEY"),
    },
  },
};
