const mongoose = require("mongoose");

const connect = async () => {
    try {
      await mongoose.connect(`mongodb+srv://shihabshaikh96:shihab96@cluster0.fmfl3pt.mongodb.net/`);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
};


module.exports = {connect};