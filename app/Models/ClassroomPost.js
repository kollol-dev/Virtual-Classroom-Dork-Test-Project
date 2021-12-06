'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ClassroomPost extends Model {

    classroom() {
        return this.belongsTo('App/Models/Classroom')
    }

    subscribedStudents() {
        return this.hasMany('App/Models/ClassroomSubscribedStudent', 'classroom_id', 'classroom_id')
    }
}

module.exports = ClassroomPost
