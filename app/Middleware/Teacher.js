"use strict";

class Teacher {
  async handle({ request }, next) {
    try {
      await auth.authenticator("teacher").check();
    } catch (error) {
      return response.status(401).json({
        message: "You are not teacher!",
      });
    }

    // call next to advance the request
    await next();
  }
}

module.exports = Teacher;
