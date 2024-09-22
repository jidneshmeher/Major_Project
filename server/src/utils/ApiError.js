class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false;
        this.errors = errors

        Error.captureStackTrace(this,this.constructor);

    }

    toJSON() {
        return {
            status: this.statusCode,
            message: this.message,
            errors: this.errors,
            success: this.success,
        };
    }
}

export {ApiError}