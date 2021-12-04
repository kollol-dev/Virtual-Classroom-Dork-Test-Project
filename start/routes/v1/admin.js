"use strict";
const Route = use("Route");

// api prefix = '/api/v1/admin/*'

// login
Route.group(() => {
  Route.post("/auth/login", "AuthController.login");
})
  .namespace("Admin")
  .prefix("/api/v1/admin")
  .middleware(['adminLoggedIn']);

// other admin routes with middleware
Route.group(() => {
  // Route.post("/auth/login", "AuthController.login");
})
  .namespace("Admin")
  .prefix("/api/v1/admin")
  .middleware(["admin"]);
