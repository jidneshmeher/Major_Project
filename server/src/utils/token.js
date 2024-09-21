import jwt from "jsonwebtoken"

export  const generateAccessToken = (user) => {
    const token = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    return token
}

export const generateRefreshToken = (user) => {
    const token = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    return token
}

export const verifyAccessToken = (token) => {
    const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    return decodedtoken
}

export const verifyRefreshToken = (token) => {
    const decodedtoken = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    return decodedtoken
}

