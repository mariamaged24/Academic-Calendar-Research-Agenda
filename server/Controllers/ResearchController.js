const req = require("express/lib/request");
const Research = require("../models/Research");

createResearch = (req, res) => {
  Research.create(req.body)
    .then((research) =>
      res.json({ msg: "Research added successfully", data: research })
    )
    .catch((err) => {
      console.log(err)
      res.status(400).json({ error: err })});
};

updateResearch = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  Research.findOne({ _id: req.params.id }, (err, research) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Research not found!",
      });
    }
    console.log(research);
    research.Field = body.Field;
    research.ResearchTitle = body.ResearchTitle;
    research.ResearchBackground = body.ResearchBackground;
    research.ResearchAbstract =body.ResearchAbstract

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

    research
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: research.id,
          message: "Research updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Research not updated!",
        });
      });
  });
};

getAllResearches = async (req, res) => {
  await Research.find({})
  .populate({path: "AssociatedUser"})
  .populate({
    path: "Comments",
    populate: {
      path: 'AssociatedUser'
    },
    })
    .exec((err, research)=>{
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!research) {
        return res.status(404).json({ success: false, error: "Research not found" });
      }
      return res.status(200).json({ success: true, data: research });
    })
};

getResearchesById = (req, res) => {
  Research.find({ AssociatedUser: req.params.id })
  .populate({path: "AssociatedUser"})
    .populate({
      path: "Comments",
      populate: {
        path: 'AssociatedUser'
      },
      })
      .exec((err, research)=>{
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        if (!research) {
          return res.status(404).json({ success: false, error: "Research not found" });
        }
        return res.status(200).json({ success: true, data: research });
      })
};

deleteResearch = async (req, res) => {
  await Research.findOneAndDelete({ _id: req.params.id }, (err, research) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!research) {
      return res.status(404).json({ success: false, error: `Research not found` });
    }
    return res.status(200).json({ success: true, data: research });
  }).catch((err) => console.log(err));
};

module.exports = {
  createResearch,
  updateResearch,
  getAllResearches,
  getResearchesById,
  deleteResearch
};