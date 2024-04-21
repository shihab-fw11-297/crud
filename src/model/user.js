const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", function(next) {
    if(! this.isModified("password")) return next();

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash

    return next();
})

userSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

// step 2 :- connect the schema to the users collection
const User = mongoose.model("user", userSchema); // users

module.exports = User;