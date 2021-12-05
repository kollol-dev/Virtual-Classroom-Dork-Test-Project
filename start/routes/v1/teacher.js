"use strict";
const Route = use("Route");

/* ***********************   api prefix = '/api/v1/teacher/*'   *********************** */

Route.group(() => {

    /*  Auth Routes */
    Route.post("/auth/login", "AuthController.login");
    Route.post("/auth/logout", "AuthController.logout");
    /*  Auth Routes Ends */
}).namespace("Teacher")
    .prefix("/api/v1/teacher")
    .middleware(['teacherLoggedIn']);



// other routes with middleware
Route.group(() => {

    /* Classroom routes */
    Route.get('/classroom/get/paginate', 'ClassRoomController.paginateClassRooms');
    Route.post('/classroom/add/new', 'ClassRoomController.addNewClassRoom');
    Route.put('/classroom/end/:class_id', 'ClassRoomController.endClassByClassId');
    /* Classroom routes ends */

    /* Classroom post routes */
    Route.post('/classroom/:class_id/posts/get/paginate', 'ClassRoomPostController.paginateClassRoomPosts');
    Route.post('/classroom/:class_id/posts/add/new', 'ClassRoomPostController.addNewPostForClassRoom');
    Route.put('/classroom/:class_id/posts/result/:post_id/submit', 'ClassRoomPostController.submitResultForClassRoomPost');
    /* Classroom post routes ends */
})
    .namespace("Teacher")
    .prefix("/api/v1/teacher")
    .middleware(["teacher"]);
