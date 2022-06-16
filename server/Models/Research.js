const mongoose = require("mongoose");
const User = require("./User");
const ResearchSchema = new mongoose.Schema({
  AssociatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  Field: {
    type: String,
    required: true,
  },

  ResearchTitle: {
    type: String,
    required: true,
  },

  ResearchAbstract: {
    type: String,
    required: true,
  },

  ResearchBackground: {
    type: String,
    required: true,
  },

  Posted: {
    type: Date,
    default: Date.now,
    required: true,
  },

  Comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
    },
  ],
});

ResearchSchema.post("findOneAndDelete",(research, next)=>{
  User.findOneAndUpdate(
      { _id: research.AssociatedUser },
      { $pull: { Researches: research._id } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err);
        }
      }
    );
  
    next();
})

ResearchSchema.post("save", (research, next) => {
  for(let i = 0;i<research.Comments.length;i++){
    Reaction.findByIdAndDelete({_id:research.Comments[i]}, (err)=>{
      if(err){
        console.log(err)
      }
    })
  }   
  User.findOneAndUpdate(
    { _id: research.AssociatedUser },
    { $push: { Researches: research._id } },
    { new: true },
    (err, user) => {
      if (err) {
        console.log(err);
      }
    }
  );

  next();
});

module.exports = Research = mongoose.model("Research", ResearchSchema);
