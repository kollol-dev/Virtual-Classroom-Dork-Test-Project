"use strict";

class Admin {
  async handle({ request }, next) {
    try {
      await auth.authenticator("admin").check();
    } catch (error) {
      return response.status(401).json({
        message: "You are not admin!",
        status: "Fail",
      });
    }
    // call next to advance the request
    await next();
  }
}

module.exports = Admin;
