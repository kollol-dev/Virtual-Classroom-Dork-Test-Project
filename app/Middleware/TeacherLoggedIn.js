"use strict";

class TeacherLoggedIn {
  async handle({ response, auth }, next) {
    try {
      if (await auth.authenticator("teacher").check())
        return response.status(400).json({
          message: "You have already logged in.",
          status: "Fail",
        });
    } catch (error) {
      return response.status(400).json({
        message: "Invalid JWT Token.",
        status: "Fail",
      });
    }

    // call next to advance the request
    await next();
  }
}

module.exports = TeacherLoggedIn;
