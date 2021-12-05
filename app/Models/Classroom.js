'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Classroom extends Model {

    teacher() {
        return this.belongsTo('App/Model/Teacher').select('id', 'fullname', 'email');
    }
}

module.exports = Classroom
