"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClassroomPostSchema extends Schema {
  up() {
    this.create("classroom_posts", (table) => {
      table.increments();
      table
        .integer("classroom_id")
        .unsigned()
        .references("id")
        .inTable("classrooms")
        .onDelete("CASCADE");
      table.string("type", 20).comment("Assignment or Exam").notNullable();
      table.datetime("deadline").notNullable().comment('YYYY-MM-DD H:mm:ss');
      table.float("marks", 4);
      table.string("result").comment("Grade");

      table.timestamps();
    });
  }

  down() {
    this.drop("classroom_posts");
  }
}

module.exports = ClassroomPostSchema;
