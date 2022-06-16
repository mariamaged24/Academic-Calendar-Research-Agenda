const Reaction = require("../models/Reaction");

createReaction = (req, res) => {
  console.log(req.body)
  Reaction.create(req.body)
    .then((reaction) =>
      res.json({ msg: "Reaction added successfully", data: reaction })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

deleteReaction = async (req, res) => {
  console.log(req.params._id)
  await Reaction.findOneAndDelete({ _id: req.params.id }, (err, reaction) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!reaction) {
      return res
        .status(404)
        .json({ success: false, error: `Reaction not found` });
    }
  }).catch((err) => console.log(err));
};


incrementHelpfulById = (req, res) => {
  Reaction.findOneAndUpdate(
    { _id: req.params.id },
    {$push: { Helpful: req.body.userId} },
    (err, reaction) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!reaction) {
        return res
          .status(404)
          .json({ success: false, error: "Reaction not found" });
      }
      else{
        return res.status(200).json({ success: true, data: reaction });
      }
    }
  );
};

decrementHelpfulById = (req, res) => {
  Reaction.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { Helpful: req.body.userId} },
    (err, reaction) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!reaction) {
        return res
          .status(404)
          .json({ success: false, error: "Reaction not found" });
      }
      else{
        return res.status(200).json({ success: true, data: reaction });
      }
    }
  );
};

updateReaction = async (req, res) => {
  console.log(req.params.id)
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Reaction.findOne({ _id: req.params.id }, (err, reaction) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Reaction not found!",
      });
    }
    console.log(reaction);
    reaction.AnswerBody = body.AnswerBody;

    if (reaction.ReactionType) {
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
    } else {
      Research.findOneAndUpdate(
        { _id: reaction.Research },
        { $pull: { Comments: reaction._id } },
        { new: true },
        (err, user) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    reaction
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: reaction.id,
          message: "Question updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          
          error,
          message: "Question not updated!",
        });
      });
  });
};

module.exports = {
  createReaction,
  incrementHelpfulById,
  decrementHelpfulById,
  updateReaction,
  deleteReaction
};
