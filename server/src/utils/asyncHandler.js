import { ApiError } from "./ApiError.js";

export const asyncHandler = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (error) {
        const statusCode = error.code || 500;
        const message = error.message || "Internal Server Error";

        res.status(statusCode).json(
            new ApiError(statusCode, message).toJSON()
        );
    }
};
