import { User } from "../models/user.model.js";
import { hashedPassword } from "../utils/bcrypt.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyPassword } from "../utils/bcrypt.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const signUp = asyncHandler(async (req, res) => {
    
    let { username, email, password } = req.body;
    
    if (!username || !email  || !password) {
        return res.status(400).json(new ApiError(400, "Invalid data inputs"));
    }
    
    const existedUser = await User.findOne({ email });
    
    if (existedUser) {
        return res.status(409).json(new ApiError(409, "User with this email already exists."));
    }
    
    password = await hashedPassword(password);
    
    const user = await User.create({ username, email, password });
    
    const createdUser = await User.findById(user._id).select("-password");
    
    if (!createdUser) {
        return res.status(500).json(new ApiError(500, "Something went wrong while registering the user"));
    }
    
    return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));

})


export const signIn = asyncHandler (async(req,res) => {

    const {username,password} = req.body

    if(!username || !password){
        return res.status(400).json(new ApiError(400,"Username and password are required").toJSON())
    }

    const user = await User.findOne({username})

    if(!user){
        return res.status(401).json(new ApiError(401,"Invalid username").toJSON())
    }

    const isPasswordValid = await verifyPassword(password,user.password)

    if(!isPasswordValid){
        return res.status(401).json(new ApiError(401,"Invalid password").toJSON())
    }

    const loggedInUser = await User.findById(user._id).select("-password")

    if(!loggedInUser){
        return res.status(401).json(new ApiError(401,"Error while Signing").toJSON())
    }

    const accessToken = generateAccessToken(loggedInUser)
    const refreshToken = generateRefreshToken(loggedInUser)
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(201)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(201, loggedInUser, "Login successful"))

})

/* 
1. User will send login credential
2. Fetch it using multer
3. Check for if they are empty or not 
4. If not empty, then find the user 
5. Take hashed password and compare it with the user send password
    If not match , then handle error
6. If ok , then send accessToken and refreshToken
*/