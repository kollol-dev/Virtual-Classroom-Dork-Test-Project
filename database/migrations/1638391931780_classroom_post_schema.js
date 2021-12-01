'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassroomPostSchema extends Schema {
  up () {
    this.create('classroom_posts', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('classroom_posts')
  }
}

module.exports = ClassroomPostSchema
