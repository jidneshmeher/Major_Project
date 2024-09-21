class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

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