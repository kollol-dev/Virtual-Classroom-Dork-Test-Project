"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class CustomException extends LogicalException {
  handle(error, { response }) {
    switch (error.status) {
      case 400:
        return response.status(400).json({
          message: "Bad Request",
        });
      case 401:
        return response.status(401).json({
          message: "You are not authorized for further operation",
        });
      case 403:
        return response.status(403).json({
          message: "Forbidden",
        });
      case 405:
        return response.status(405).json({
          message: "Not Allowed",
        });
    }
  }
}

module.exports = CustomException;
