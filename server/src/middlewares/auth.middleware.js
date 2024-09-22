import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { verifyAccessToken } from "../utils/token.js"

export const verifyToken = asyncHandler(async(req,res,next) => {    

    const token = req.cookies?.accessToken 

    if(!token){
        return res
        .status(401)
        .json(new ApiError(401,"Authentication Failed").toJSON())
    }

    const isTokenValid = verifyAccessToken(token) 

    if(!isTokenValid){
        return res
        .status(403)
        .json(new ApiError(403,"Invalid or expired access token").toJSON())
    }

    req.user = isTokenValid._id
    next()
})
