const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'videos' },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;