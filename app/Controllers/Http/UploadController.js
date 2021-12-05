'use strict'
// Helpers
const Helpers = use('Helpers')
const CustomException = use("App/Exceptions/CustomException");
const Env = use('Env')
class UploadController {

    async uploadFile({ request, response }) {

        const file = request.file('file', {
            allowedExtensions: ['jpg', 'png', 'pdf', 'docx'],
            maxSize: '50mb'
        })

        if (file) {
            const type = file.toJSON().extname.toLowerCase();
            const name = `file_${new Date().getTime()}.${type}`

            // UPLOAD THE file TO UPLOAD FOLDER
            await file.move(Helpers.publicPath('uploads'), {
                name: name
            })

            if (!file.moved()) {
                throw new CustomException("Something went worng with file upload", 500, "")
                // return file.error()
            }

            return response.status(200).json({
                message: 'File has been uploaded successfully!',
                url: `${Env.get('SITE_URL')}/uploads/${name}`,
                type: type
            })
        }

        return response.status(200).json({
            message: 'Invalid Request!'
        })
    }
}

module.exports = UploadController
