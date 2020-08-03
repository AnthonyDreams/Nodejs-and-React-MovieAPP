class ApplicationError extends Error {
    statusCode: any;
    status: any;
    constructor(statusCode, status, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
}


module.exports = ApplicationError;

