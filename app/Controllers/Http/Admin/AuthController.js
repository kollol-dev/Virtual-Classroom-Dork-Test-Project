"use strict";

// Models
const Admin = use("App/Models/Admin");

// Plugins & Exceptions
const { validate } = use("Validator");
const CustomException = use('App/Exceptions/CustomException')

class AuthController {
  async login({ request, response, auth }) {
    try {
      let user = await authUser();
    } catch (error) {
      throw new CustomException('', 401, '')
    }
  }
}

module.exports = AuthController;
