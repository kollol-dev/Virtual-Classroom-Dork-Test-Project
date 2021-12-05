"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClassroomPostSchema extends Schema {
  up() {
    this.table("classroom_posts", (table) => {
      table
        .integer("teacher_id")
        .unsigned()
        .references("id")
        .inTable("teachers")
        .after("classroom_id")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("classroom_posts", (table) => {
      // reverse alternations
    });
  }
}

module.exports = ClassroomPostSchema;
