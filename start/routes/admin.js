"use strict";
const Route = use("Route");

// api prefix = '/api/admin/*'

Route.group(() => {
  Route.get("/", "AuthController.get");
})
  .namespace("Admin")
  .prefix("/api/admin");
