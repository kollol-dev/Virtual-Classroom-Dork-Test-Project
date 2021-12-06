'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NotificationSchema extends Schema {
  up () {
    this.create('notifications', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.string('user_type', 10).notNullable().comment('student, teacher, admin')
      table.string('notifying_text', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('notifications')
  }
}

module.exports = NotificationSchema
