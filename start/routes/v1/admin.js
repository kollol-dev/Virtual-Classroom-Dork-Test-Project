"use strict";
const Route = use("Route");

// api prefix = '/api/v1/admin/*'

Route.group(() => {
  Route.post("/auth/login", "AuthController.login");
})
  .namespace("Admin")
  .prefix("/api/v1/admin");
