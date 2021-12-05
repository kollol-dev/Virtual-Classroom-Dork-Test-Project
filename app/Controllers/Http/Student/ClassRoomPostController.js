"use strict";

// Models
const Student = use("App/Models/Student");
const Classroom = use("App/Models/Classroom");
const ClassroomPost = use("App/Models/ClassroomPost");
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


    async submitResultByClassId({ request, response }){
        
    }
}

module.exports = ClassRoomPostController
