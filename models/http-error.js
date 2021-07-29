class HttpError extends Error {
    constructor(error,message, errorCode) {
      super(message);
      this.code = errorCode;
      console.error(error,message,errorCode,Date.now())
    }
  }
  
  module.exports = HttpError;