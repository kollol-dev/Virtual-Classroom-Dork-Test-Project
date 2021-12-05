'use strict'

// Models
const Classroom = use("App/Models/Classroom")

// Plugins & Exceptions
const CustomException = use("App/Exceptions/CustomException");
const { validate } = use("Validator");
const { pagination, generateRandomString } = require("../../../Modules/Common")

class ClassRoomController {

    async paginateClassRooms({ request, response }) {
        let page = request.input('page', 1)

        return response.status(200).json({
            status: 'Success',
            response: await Classroom.query().paginate(page, pagination)
        })
    }

    async addNewClassRoom({ request, response, auth }) {
        try {
            var teacher = await auth.authenticator('teacher').getUser()
        } catch (error) {
            throw CustomException("", 401, "")
        }

        let invitation_code = `${generateRandomString(4)}-${generateRandomString(3)}-${generateRandomString(4)}`;

        try {
            var classroom = await Classroom.create({
                teacher_id: teacher.id,
                invitation_code: invitation_code,
                status: 'running'
            })
        } catch (error) {
            throw CustomException("", 500, "")

        }

        return response.status(200).json({
            status: 'Success',
            response: classroom
        })
    }

    async endClassByClassId({ request, response, auth, params }) {

        // check classroom with class_id and logged in teacher's id
        // if found then checking for running or not.

        try {
            var teacher = await auth.authenticator('teacher').getUser()
        } catch (error) {
            throw CustomException("", 401, "")
        }


        let checkCounter = await Classroom.query()
            .where('id', params.class_id)
            .where('teacher_id', teacher.id)
            .where('status', 'running')
            .getCount()

        /* Classroom not found  */
        if (!checkCounter) {
            throw new CustomException("Class not found or was ended before", 400, "")
        }

        /* Change status running to ended */
        let updateClass = await Classroom.query().where('id', params.class_id)
            .update({
                status: 'ended'
            })

        /*  If update did not happened */
        if (!updateClass) {
            throw new CustomException("Class status update from running to ended did not succeeded", 500, "")
        }


        return response.status(202).json({
            status: 'Success',
            message: 'Class has ended'
        })
    }
}

module.exports = ClassRoomController
