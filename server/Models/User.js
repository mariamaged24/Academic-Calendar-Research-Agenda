const mongoose = require("mongoose");
const Task = require("./Task");
const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        unique: true,
      },
    
      Password: {
        type: String,
        required: true,
        unique: true,
      },

      FirstName: {
        type: String,
        required: true,
      },

      LastName: {
        type: String,
        required: true,
      },

      Email: {
        type: String,
        required: true,
        unique: true,
      },

      University: {
       type: String,
       required: true
      },

      FieldOfStudy: {
        type: String,
        required: true
      },

      Intersts: [
        {
            Interest: {
                type: String,
            }
        }
    ],

    Tasks: [
        {
            TaskId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task",
            },
            Priority: {
                type: Number,
            }
        }
    ] 
})

module.exports = User = mongoose.model("user", UserSchema);