const req = require("express/lib/request");
const Question = require("../models/Question");

createQuestion = (req, res) => {
  Question.create(req.body)
    .then((question) =>
      res.json({ msg: "Question added successfully", data: question })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

updateQuestion = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Question.findOne({ _id: req.params.id }, (err, question) => {
    if (err) {
      console.log("cannot find", err)
      return res.status(404).json({
        err,
        message: "Question not found!",
      });
    }
    console.log(question);
    question.Field = body.Field;
    question.QuestionTitle = body.QuestionTitle;
    question.QuestionBody = body.QuestionBody;

    User.findOneAndUpdate(
      { _id: question.AssociatedUser },
      { $pull: { Questions: question._id } },
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err);
        }
      }
    );
    question
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: question.id,
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

getAllQuestions = async (req, res) => {
  await Question.find({})
  .populate({path:"AssociatedUser"})
  .populate({
    path: "Answers",
    populate: {
      path: 'AssociatedUser'
    },
    })
    .exec((err, question)=>{
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!question) {
        return res.status(404).json({ success: false, error: "Question not found" });
      }
      return res.status(200).json({ success: true, data: question });
    })
};

getQuestionsById = (req, res) => {
  Question.find({ AssociatedUser: req.params.id })
  .populate({path: "AssociatedUser"})
    .populate({
      path: "Answers",
      populate: {
        path: 'AssociatedUser'
      },
      })
      .exec((err, question)=>{
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!question) {
          return res.status(404).json({ success: false, error: "Question not found" });
        }
        return res.status(200).json({ success: true, data: question });
      })
};

deleteQuestion = async (req, res) => {
  await Question.findOneAndDelete({ _id: req.params.id }, (err, question) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!question) {
      return res.status(404).json({ success: false, error: `Question not found` });
    }
    return res.status(200).json({ success: true, data: question });
  }).catch((err) => console.log(err));
};

module.exports = {
  createQuestion,
  updateQuestion,
  getAllQuestions,
  getQuestionsById,
  deleteQuestion
};
