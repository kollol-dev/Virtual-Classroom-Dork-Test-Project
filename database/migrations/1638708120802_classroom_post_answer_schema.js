'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomPostAnswerSchema extends Schema {
  up() {
    this.create('classroom_post_answers', (table) => {
      table.increments()
      table
        .integer("classroom_id")
        .unsigned()
        .references("id")
        .inTable("classrooms")
        .onDelete("CASCADE");
      table
        .integer("classroom_post_id")
        .unsigned()
        .references("id")
        .inTable("classroom_posts")
        .onDelete("CASCADE");
      table
        .integer("student_id")
        .unsigned()
        .references("id")
        .inTable("students")
        .onDelete("CASCADE");

      table.string('type', 60).comment('File type')
      table.text('url').comment('File location')
      table.timestamps()
    })
  }

  down() {
    this.drop('classroom_post_answers')
  }
}

module.exports = ClassroomPostAnswerSchema
