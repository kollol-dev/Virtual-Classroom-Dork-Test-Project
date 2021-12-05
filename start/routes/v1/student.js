"use strict";
const Route = use("Route");
const CustomException = use("App/Exceptions/CustomException");

/* ***********************   api prefix = '/api/v1/student/*'   *********************** */

Route.group(() => {

    Route.post("/classroom/subscribe", 'ClassRoomController.subscribeToClass')

}).namespace("Student")
    .prefix("/api/v1/student")
    .middleware(['studentLoggedIn']);



// other routes with middleware
Route.group(() => {

    /* Classroom post routes */
    Route.get('/classroom/:class_id/posts/get/paginate', 'ClassRoomPostController.paginateClassRoomPostsByStudnetId');
    Route.post('/classroom/:class_id/posts/result/submit', 'ClassRoomPostController.submitResultByClassId');
    /* Classroom post routes ends */
})
    .namespace("Student")
    .prefix("/api/v1/student")
    .middleware(["student"]);



// Upload Api
Route.post('/api/v1/upload', 'UploadController.uploadFile');


Route.any('*', () => {
    throw CustomException("", 404, "");;
})