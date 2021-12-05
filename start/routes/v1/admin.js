"use strict";
const Route = use("Route");

/* ***********************   api prefix = '/api/v1/admin/*'   *********************** */

/* login */
Route.group(() => {
  Route.post("/auth/login", "AuthController.login");
})
  .namespace("Admin")
  .prefix("/api/v1/admin")
  .middleware(["adminLoggedIn"]);

/* other admin routes with middleware */
Route.group(() => {

  /* teacher CRUD routes */
  Route.get("/teacher/get/paginate", "TeacherController.paginateTeachers");
  Route.post("/teacher/add/new", "TeacherController.addNewTeacher");
  Route.put("/teacher/edit/:id", "TeacherController.editTeacherByTeacherId");
  Route.delete("/teacher/delete/:id", "TeacherController.deleteTeacherByTeacherId");
  /* teacher CRUD routes */

})
  .namespace("Admin")
  .prefix("/api/v1/admin")
  .middleware(["admin"]);
