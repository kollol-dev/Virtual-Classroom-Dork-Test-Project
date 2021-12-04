"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class CustomException extends LogicalException {
  handle(error, { response }) {
    let message = "";
    switch (error.status) {
      
      case 400:
        message = "Bad Request";
      case 401:
        message = "You are not authorized for further operation";
      case 403:
        message = "Forbidden";
      case 405:
        message = "Not Allowed";
    }

    return response.status(400).json({
      message: message,
      status: "Fail",
    });
  }
}

module.exports = CustomException;
