"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StudentSchema extends Schema {
  up() {
    this.create("students", (table) => {
      table.increments();
      table.string("fullName", 254).notNullable();
      table.string("email", 254).notNullable().unique();
      table.string("school_id", 254).notNullable();
      table.string("password").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("students");
  }
}

module.exports = StudentSchema;
