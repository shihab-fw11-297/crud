const { asyncHandler } = require("../utils/asyncHandler");
const PostMessage = require("../model/post");
const ApiResponse = require("../utils/ApiResponse");
const ErrorHandler = require("../utils/errorHandler");

const createData = asyncHandler(async (req, res, next) => {
    const post = req.body;
    const { title, message } = post;

    if (!title || !message)
        return next(new ErrorHandler("Please add all fields", 400));

    const newPostMessage = new PostMessage({ ...post, user: req.userId, createdAt: new Date().toISOString() });
    await newPostMessage.save();

    const response = {
        ...newPostMessage._doc
    };

    return res.status(200).json(
        new ApiResponse(200, response, "Post Create Successfully")
    );
});

const updateData = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const post = req.body;

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    if (!updatedPost) {
        return next(new ErrorHandler("Post not found", 404));
    }

    return res.status(200).json(
        new ApiResponse(200, updatedPost, "Post updated successfully")
    );
});

const getData = asyncHandler(async (req, res, next) => {
    const posts = await PostMessage.find();
    return res.status(200).json(
        new ApiResponse(200, posts, "Posts retrieved successfully")
    );
});

const deleteData = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedPost = await PostMessage.findByIdAndDelete(id);

    if (!deletedPost) {
        return next(new ErrorHandler("Post not found", 404));
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Post deleted successfully")
    );
});

const findSingleData = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const post = await PostMessage.findById(id);

    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    return res.status(200).json(
        new ApiResponse(200, post, "Post retrieved successfully")
    );
});

module.exports = { createData, updateData, getData, deleteData, findSingleData };
