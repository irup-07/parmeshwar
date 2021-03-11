const mongoose = require("mongoose");
const validator = require("validator");

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: [true, "Product with this Name Already Exist"],
    minlength: [5, "A tour must have minimum charactr 5"],
  },

  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  codeSnippet: {
    type: String,
  },
  description: {
    type: String
  },
  approvedBy: {
    type: String
  },
  enableDisplay: {
    type: String
  },
  photo: {
    type: String,
    required: true,
  },
  
  tag1: {
    type: String
  },
  tag2: {
    type: String
  },
  tag3: {
    type: String
  },
  tag3: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// productSchema.pre("save", function () {
//   console.log(this);
// });

const Video = mongoose.model("Video", VideoSchema);
// Product.createIndexes();

module.exports = Video;