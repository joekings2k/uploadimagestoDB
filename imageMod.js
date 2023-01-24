const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = {
  imageModel: mongoose.model("Image", imageSchema),
  imageSchema:imageSchema
};
