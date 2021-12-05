"use strict";
const Route = use("Route");

// api prefix = '/'

Route.get("/", ({ response }) => {
  return response.status(200).json({
    message: `Everything looks well. For api documentation, you can visit this link ------- https://github.com/kollolx/Virtual-Classroom-Dork-Test-Project -------`,
  });
});


// Upload Api
Route.post('/api/v1/upload/file', 'UploadController.uploadFile');