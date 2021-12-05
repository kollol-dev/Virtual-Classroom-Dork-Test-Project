"use strict";

// Models
const Teacher = use("App/Models/Teacher");

// Plugins & Exceptions
const CustomException = use("App/Exceptions/CustomException");
const { validate } = use("Validator");
const jwt_decode = require("jwt-decode");

class AuthController {
    async login({ request, response, auth }) {
        const rules = {
            email: "required|email",
            password: "required|string",
        };

        // validate request body
        const validation = await validate(request.body, rules);

        // incomplete / invalid request
        if (validation.fails()) {
            return response.status(401).json({
                message: "Invalid credentials or request body is incomplete or invalid",
                status: "Fail",
            });
        }

        /*
          Checking if this email exists or not.
          If not, throw exception of status code 400 
        */
        if ((await Teacher.query().where("email", request.body.email).count()) == 0) {
            throw CustomException("", 400, "");
        }

        try {
            let authAttemptResponse = await auth
                .authenticator("teacher")
                .attempt(request.body.email, request.body.password);
            if (authAttemptResponse && authAttemptResponse.token) {
                return response.status(200).json({
                    accessToken: authAttemptResponse.token,
                    tokenDecode: jwt_decode(authAttemptResponse.token),
                });
            }
            return authAttemptResponse;
        } catch (error) {
            return response.status(401).json({
                message: "Invalid Credentials",
                status: "Fail",
            });
        }
    }

    async logout({ request, response, auth }) {

    }
}

module.exports = AuthController;
