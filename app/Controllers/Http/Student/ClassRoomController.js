"use strict";

// Models
const Student = use("App/Models/Student");
const Classroom = use("App/Models/Classroom");
const ClassroomSubscribedStudent = use("App/Models/ClassroomSubscribedStudent");

// Plugins & Exceptions
const CustomException = use("App/Exceptions/CustomException");
const { validate } = use("Validator");
const { pagination } = require("../../../Modules/Common");

class ClassRoomController {
    async subscribeToClass({ request, response, auth }) {
        const rules = {
            fullName: "required|string|max:254",
            email: "required|email|unique:students,email|max:100",
            school_id: "required|integer|max:60",
            invitation_code: 'required|string|max:254',
        };

        const messages = {
            "fullName.required": "Full name is required",
            "email.required": "Email is required",
            "email.unique": "Email already is in use",
            "school_id.required": "School ID is required",
            "invitation_code.required": "Invitation CODE is required",
        };

        // validate request body
        const validation = await validate(request.body, rules, messages);

        // incomplete / invalid request
        if (validation.fails()) {
            return response.status(400).json(validation.messages());
        }


        // check for classroom
        let checkCounter = await Classroom.query()
            .where("invitation_code", request.body.invitation_code)
            .where("status", "running")
            .getCount();

        /* Classroom not found  */
        if (!checkCounter) {
            throw new CustomException(
                "Classroom not found or this classroom has ended already.",
                400,
                ""
            );
        }

        try {
            var [student, classroom] = await Promise.all([
                Student.findOrCreate(
                    { email: request.body.email },
                    {
                        fullName: request.body.fullName,
                        email: request.body.email,
                        school_id: request.body.school_id,
                    }
                ),
                Classroom.query()
                    .where("invitation_code", request.body.invitation_code)
                    .where("status", "running")
                    .first()
            ])
        } catch (error) {
            /* Something went worng  */
            throw new CustomException("", 500, "");
        }

        let checkCounter = await ClassroomSubscribedStudent.query()
            .where("classroom_id", classroom.id)
            .where("student_id", student.id)
            .getCount();

        /* Already subscribed  */
        if (checkCounter) {
            throw new CustomException(
                "You have already subscribed this classroom.",
                403,
                ""
            );
        }

        await ClassroomSubscribedStudent.create({
            classroom_id: classroom.id,
            student_id: student.id,
        });

        return response.status(200).json({
            status: "Success",
            message: "Classroom subscibed.",
        });
    }
}

module.exports = ClassRoomController;
