const mongoose = require("mongoose");
const User = require("./User");
const QuestionSchema = new mongoose.Schema({
  AssociatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Field: {
    type: String,
    required: true,
  },

  QuestionTitle: {
    type: String,
    required: true,
  },

  QuestionBody: {
    type: String,
    required: true,
  },

  Posted: {
    type: Date,
    required: true,
    default: Date.now,
  },

  Answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
});

QuestionSchema.post("save", (question, next) => {
  User.findOneAndUpdate(
    { _id: question.AssociatedUser },
    { $push: { Questions: question._id } },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
      }
    }
  );

  next();
});

QuestionSchema.post("findOneAndDelete",(question, next)=>{
  for(let i = 0;i<question.Answers.length;i++){
    Reaction.findByIdAndDelete({_id:question.Answers[i]}, (err)=>{
      if(err){
        console.log(err)
      }
    })
  }    
  User.findOneAndUpdate(
        { _id: question.AssociatedUser },
        { $pull: { Questions: question._id } },
        { new: true },
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

    
    
      next();
})

module.exports = Question = mongoose.model("Question", QuestionSchema);
