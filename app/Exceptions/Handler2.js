"use strict";

const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {

    return response.json({
      error: error
    })
    // if (e.errno == 1452) {
    //   return response.status(400).json({
    //     msg: "This item may be removed or try again later",
    //   });
    // }
    // if (e.errno == 1048) {
    //   return response.status(400).json({
    //     msg: "Some important field are missing or try again later",
    //   });
    // }
    // if (e.code === "EBADCSRFTOKEN") {
    //   response.forbidden("Cannot process your request.");
    //   return;
    // }

    // return response.status(400).json({
    //   msg: e.message,
    // });

    // return response.status(400).json({
    //   msg: "Something went wrong, please try again later",
    // });
    // return e;
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler;
