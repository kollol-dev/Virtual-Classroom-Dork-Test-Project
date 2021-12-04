"use strict";

class AdminLoggedIn {
  async handle({ request }, next) {
    if (auth.authenticator("admin").check())
      return response.status(400).json({
        message: "You have already logged in.",
        status: "Fail",
      });

    // call next to advance the request
    await next();
  }
}

module.exports = AdminLoggedIn;
