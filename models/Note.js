const mongoose = require("mongoose"); // require mongoose connector
const { Schema } = require("mongoose");
// usersSchema
const NotesSchema = new Schema({
  // user module
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    reqired: true,
  },
  tag: {
    type: String,
    default: "Genral",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", NotesSchema); // export the mdouleu
