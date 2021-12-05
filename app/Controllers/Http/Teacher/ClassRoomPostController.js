'use strict'

// Models
const Classroom = use("App/Models/Classroom")
const ClassroomPost = use("App/Models/ClassroomPost")

// Plugins & Exceptions
const CustomException = use("App/Exceptions/CustomException");
const { validate } = use("Validator");
const { pagination, generateRandomString } = require("../../../Modules/Common")

class ClassRoomPostController {

    async paginateClassRoomPosts({ request, response, auth }) {
        let page = request.input('page', 1)

        try {
            var teacher = await auth.authenticator('teacher').getUser()
        } catch (error) {
            throw new CustomException("", 401, "")
        }

        return response.status(200).json({
            status: 'Success',
            response: await ClassroomPost.query()
                .where('teacher_id', teacher.id)
                .with('classroom')
                .paginate(page, pagination)
        })
    }

    async addNewPostForClassRoom({ request, response, auth, params }) {
        const rules = {
            type: "required|string",
            deadline: "required|date"
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

        try {
            var teacher = await auth.authenticator('teacher').getUser()
        } catch (error) {
            throw new CustomException("", 401, "")
        }


        let classroomPost = await ClassroomPost.create({
            classroom_id: Number(params.class_id),
            teacher_id: teacher.id,
            type: request.body.type,
            deadline: request.body.deadline,
        })

        if (!classroomPost)
            throw new CustomException("Something went wrong with class room post creations", 500, "")


        return response.status(200).json({
            status: 'Success',
            response: classroomPost
        })
    }

    async submitResultForClassRoomPost({ request, response, auth, params }) {
        const rules = {
            marks: "required|number",
            result: "required|string|min:1|max:4",
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

        try {
            var teacher = await auth.authenticator('teacher').getUser()
        } catch (error) {
            throw new CustomException("", 401, "")
        }

        let checkCounter = await ClassroomPost.query()
            .where('id', params.post_id)
            .where('classroom_id', params.class_id)
            .where('teacher_id', teacher.id)
            .getCount()

        /* Post not found  */
        if (!checkCounter) {
            throw new CustomException("Post not found or this post belongs to another teacher.", 400, "")
        }

        /*  add result to the post */
        var update = await ClassroomPost.where('id', params.post_id)
            .where('classroom_id', params.class_id)
            .where('teacher_id', teacher.id)
            .update({
                marks: request.body.marks,
                result: request.body.result,
            })

        /*  If update did not happened */
        if (!update)
            throw new CustomException("Something went wrong with result submitting", 500, "")


        return response.status(200).json({
            status: 'Success',
            message: 'Result has submited.'
        })
    }
}

module.exports = ClassRoomPostController
