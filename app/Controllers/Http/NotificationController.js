'use strict'

const cron = require('node-cron');
const Notification = use('App/Models/Notification')

class NotificationController {
  async test({ request, response, auth }) {

    const self = this
    cron.schedule('*/10 * * * *', function () {
      console.log('running a task every minute');
      self.createNotfication()
    });
    return 'sdfsdf'
  }


  createNotfication() {
    return Notification.create({
      user_id: 1,
      user_type: 'Student',
      notifying_text: 'Test Notification'
    })
  }
}

module.exports = NotificationController
