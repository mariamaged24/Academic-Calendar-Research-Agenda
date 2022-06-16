const mongoose = require("mongoose");
const User = require("./User");
const ReactionSchema = new mongoose.Schema({
  AssociatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Question:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },

  Research:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Research",
  },
//true for question, false for research
  ReactionType: {
    type: Boolean,
    required: true,
  },

  AnswerBody: {
    type: String,
    required: true,
  },

  Helpful:
    [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    }],

  Posted: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

ReactionSchema.post("save", (reaction, next) => {
    if(reaction.ReactionType){
   Question.findOneAndUpdate(
      { _id: reaction.Question },
      { $push: { Answers: reaction._id } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err);
        }
      }
    );
    }
    else{
      console.log(reaction)
        Research.findOneAndUpdate(
            { _id: reaction.Research },
            { $push: { Comments: reaction._id } },
            { new: true },
            (err, user) => {
              if (err) {
                console.log(err);
              }
              else{
                console.log(user)
              }
            }
          ); 
    }
    next();
  });

  ReactionSchema.post("findOneAndDelete", (reaction, next) => {
    if(reaction.ReactionType){
   Question.findOneAndUpdate(
      { _id: reaction.Question },
      { $pull: { Answers: reaction._id } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err);
        }
      }
    );
    }
    else{console.log(reaction)
        Research.findOneAndUpdate(
            { _id: reaction.Research },
            { $pull: { Comments: reaction._id } },
            { new: true },
            (err, user) => {
              if (err) {
                console.log(err);
              }
              else{
                console.log(user)
              }
            }
          ); 
    }
    next();
  });

module.exports = Reaction = mongoose.model("Reaction", ReactionSchema);