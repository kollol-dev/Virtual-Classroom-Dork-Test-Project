"use strict";
const Route = use("Route");

// api prefix = '/api/admin/*'

Route.group(() => {
  Route.get("/", "AdminController.get").prefix("/api/admin");
});
