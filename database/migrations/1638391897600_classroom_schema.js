"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ClassroomSchema extends Schema {
  up() {
    this.create("classrooms", (table) => {
      table.increments();
      table.integer("teacher_id").unsigned().references("id").inTable("teachers").onDelete('CASCADE');
      table.string("invitation_code", 100).notNullable();
      table.string("status", 20).defaultTo("running").comment('running or stopped');
      table.timestamps();
    });
  }

  down() {
    this.drop("classrooms");
  }
}

module.exports = ClassroomSchema;
