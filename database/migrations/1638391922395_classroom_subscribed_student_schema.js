'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomSubscribedStudentSchema extends Schema {
  up () {
    this.create('classroom_subscribed_students', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('classroom_subscribed_students')
  }
}

module.exports = ClassroomSubscribedStudentSchema
