"use strict";

const Factory = use("Factory");
const Hash = use("Hash");

Factory.blueprint("App/Models/Admin", async (faker) => {
  return {
    email: "admin@mail.com",
    password: await Hash.make("123123")
  };
});
