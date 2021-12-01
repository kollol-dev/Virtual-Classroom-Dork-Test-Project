'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomSchema extends Schema {
  up () {
    this.create('classrooms', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('classrooms')
  }
}

module.exports = ClassroomSchema
