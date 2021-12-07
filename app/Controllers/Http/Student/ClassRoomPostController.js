"use strict";

// Models
const Student = use("App/Models/Student");
const Classroom = use("App/Models/Classroom");
const ClassroomPost = use("App/Models/ClassroomPost");
const ClassroomPostAnswer = use("App/Models/ClassroomPostAnswer");
const ClassroomSubscribedStudent = use("App/Models/ClassroomSubscribedStudent");

// Plugins & Exceptions
const CustomException = use("App/Exceptions/CustomException");
const { validate } = use("Validator");


class ClassRoomPostController {

    async paginateClassRoomPostsByStudnetId({ request, response, auth }) {
        let page = request.input('page', 1)

        try {
            var student = await auth.authenticator('student').getUser()
        } catch (error) {
            throw new CustomException("", 401, "")
        }

        let classRoomIds = await ClassroomSubscribedStudent.where('student_id', student.id)
            .pluck('classroom_id');

        return response.status(200).json({
            status: 'Success',
            response: await ClassroomPost.query()
                .whereIn('id', classRoomIds)
                .where('deadline', '>', moment().format('YYYY-MM-DD H:mm:ss'))
                .whereHas('classroom', builder => {
                    builder.where('status', 'running')
                })
                .paginate(page, pagination)
        })
    }


    async submitResultByClassId({ request, response }) {
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

        let answer = await ClassroomPostAnswer.create({
            classroom_id: request.body.classroom_id,
            classroom_post_id: request.body.classroom_post_id,
            student_id: request.body.student_id,
            type: request.body.type,
            url: request.body.url,
        })

        if (!answer)
            throw new CustomException("", 500, "")

        return response.json(201).json({
            status: 'Success',
            response: answer
        })

    }
}

module.exports = ClassRoomPostController
