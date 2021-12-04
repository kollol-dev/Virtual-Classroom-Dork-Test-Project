'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomSubscribedStudentSchema extends Schema {
  up () {
    this.create('classroom_subscribed_students', (table) => {
      table.increments()
      table.integer("student_id").unsigned().references("id").inTable("students").onDelete('CASCADE');
      table.integer("classroom_id").unsigned().references("id").inTable("classrooms").onDelete('CASCADE');
      table.timestamps()
    })
  }

  down () {
    this.drop('classroom_subscribed_students')
  }
}

module.exports = ClassroomSubscribedStudentSchema
