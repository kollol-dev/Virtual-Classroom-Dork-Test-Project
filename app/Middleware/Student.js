"use strict";

class Student {
  async handle({ request }, next) {
    try {
      await auth.authenticator("student").check();
    } catch (error) {
      return response.status(401).json({
        message: "You are not student!",
      });
    }

    // call next to advance the request
    await next();
  }
}

module.exports = Student;
