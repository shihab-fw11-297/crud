const { asyncHandler } = require("../utils/asyncHandler")
const ErrorHandler = require("../utils/errorHandler");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../model/user");
const jwt = require("jsonwebtoken");


const newToken = (user) => {
    return jwt.sign({user}, `123`);
}

const register = asyncHandler(async (req, res, next) => {

    const { fullName, email, userName, password } = req.body;

    if (!fullName || !userName || !email || !password)
        return next(new ErrorHandler("Please add all fields", 400));

    const existUser = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (existUser) {
        return next(new ErrorHandler("User with email or username already exists",409));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        userName: userName.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        return next(new ErrorHandler("Something went wrong while registering the user",500));
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
});

const login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email && !password) {
        return next(new ErrorHandler("username or password is required", 400));
    }

    let user = await User.findOne({ email });

    if (!user) {
        return next(new ErrorHandler("User does not exist", 404));
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid user credentials", 401));
    }

    const token = newToken(user)

    user = { ...user._doc };
    delete user.password;

    return res.status(200).json(
        new ApiResponse(200, {user, token}, "User login Successfully")
    )
});

module.exports = { register, login }