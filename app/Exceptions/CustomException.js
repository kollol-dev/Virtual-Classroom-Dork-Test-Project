"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class CustomException extends LogicalException {
  handle(error, { response }) {
    let message = "";
    switch (error.status) {
      case 400:
        message = error.message ? error.message : "Bad Request";
        break;
      case 401:
        message = error.message ? error.message : "You are not authorized for further operation";
        break;
      case 403:
        message = "Forbidden";
        break;
      case 404:
        message = "Not Found";
        break;
      case 405:
        message = "Not Allowed";
        break;
      case 500:
        message = error.message ? error.message : "Something went wrong";
        break;
    }

    return response.status(error.status).json({
      message: message,
      status: "Fail",
    });
  }
}

module.exports = CustomException;
