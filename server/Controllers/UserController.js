const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");

createUser = async (req, res) => {
  const user = req.body;
  user.Password = await bcrypt.hash(req.body.Password, 10);

  User.create(user)
    .then((user) =>
      res.json({ msg: "User added successfully", data: req.body })
    )
    .catch((err) => res.status(400).json({ err }));
};

validateEmail = async (req, res) => {
  const user = req.body;
  let existingEmail = await User.findOne({ Email: user.Email });

  if (!existingEmail) {
    return res.status(200).send({ message: "Valid Email" });
  } else {
    return res.status(400).send({ message: "Invalid Email" });
  }
};

login = async (req, res) => {
  const userLoggingIn = req.body;
  console.log("LOGIN ");
  await User.findOne({ Email: userLoggingIn.Email }).then((dbUser) => {
    if (!dbUser) {
      res.status(400).send({ message: "Invalid Email" });
    } else {
      bcrypt
        .compare(userLoggingIn.Password, dbUser.Password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              userId: dbUser._id,
            };
            jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
              if (err) {
                return res.json({ message: "line 48 controller" });
              }
              return res.json({
                message: "Success",
                token: "Bearer " + token,
                data: dbUser,
              });
            });
          } else {
            res.status(400).send({ message: "Wrong Password" });
          }
        });
    }
  });
};

changeUserPassword = async (req, res) => {
  const body = req.body;
  console.log(req.body);
  if (!body) {
    return res.status(400).send({ message: "invalid" });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "invalid" });
    }
    bcrypt.compare(body.oldPassword, user.Password).then(async (isCorrect) => {
      if (isCorrect) {
        user.Password = await bcrypt.hash(body.newPassword, 10);
      }

      user
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: user.id,
            message: "Password updated!",
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: "Password not updated!",
          });
        });
    });
  });
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, message: err });
    }

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

followUser = (req, res) => {
  const body = req.body;
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { Following: body.followingid } },
    (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
    }
  );

  User.findOneAndUpdate(
    { _id: body.followingid },
    { $push: { Followers: req.params.id } },
    (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      } else {
        return res.status(200).json({ success: true, data: user });
      }
    }
  );
};

unfollowUser = (req, res) => {
  const body = req.body;
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { Following: body.followingid } },
    (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
    }
  );

  User.findOneAndUpdate(
    { _id: body.followingid },
    { $pull: { Followers: req.params.id } },
    (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      } else {
        return res.status(200).json({ success: true, data: user });
      }
    }
  );
};

getFollowersById = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .populate("Followers")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    });
};

getFollowingQuestionsById = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .populate({
      path: "Following",
      populate: {
        path: "Questions",
        populate: { path: "Answers", populate: { path: "AssociatedUser" } },
      },
    })
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    });
};

getFollowingResearchesById = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .populate({
      path: "Following",
      populate: {
        path: "Researches",
        populate: { path: "Comments", populate: { path: "AssociatedUser" } },
      },
    })
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    });
};

getFollowingById = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .populate("Following")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      return res.status(200).json({ success: true, data: user });
    });
};

updateChanges = async (req, res) => {
  const body = req.body;
  var schedules = [];
  console.log(body.Updated[0], "ejbk");
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  await User.findOne({ _id: req.params.id })
    .then((res) => {
      for (let i = 0; i < res.ScheduledTasks.length; i++) {
        var scheduled = res.ScheduledTasks[i];
        console.log(scheduled.TaskId, "iiiiiii");
        for (let j = 0; j < body.Tasks.length; j++) {
          var task = body.Tasks[j];
          console.log(task.TaskId, "jjjj");
          if (body.Updated !== undefined) {
            if (
              scheduled.TaskId === task.TaskId &&
              body.Updated[0].TaskId != scheduled.TaskId
            ) {
              console.log(task.TaskId);
              found = true;
              schedules.push(scheduled);
              break;
            } else {
              if (scheduled.TaskId === task.TaskId) {
                console.log(task.TaskId);
                found = true;
                schedules.push(scheduled);
                break;
              }
            }
          }
        }
        found = false;
      }
      for (let i = 0; i < res.Overlapping.length; i++) {
        console.log(res.Overlapping[i], "OVERRRRRRR");
        schedules.push(res.Overlapping[i]);
      }

      if (typeof body.Updated !== undefined) {
        for (let i = 0; i < body.Tasks.length; i++) {
          if (body.Tasks[i].TaskId === body.Updated[0].TaskId) {
            body.Tasks[i].Scheduled = false;
          }
        }
      }
    })
    .catch((err) => {
      console.log();
      console.log(err);
    });
  console.log(schedules, "overlapping fennnn");
  User.updateOne(
    { _id: req.params.id },
    { ScheduledTasks: schedules, Tasks: body.Tasks, Overlapping: [] }
  ).catch((err) => {
    console.log(err);
  });
};

addScheduledTask = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  var newTask = {
    TaskId: initializeId(),
    Priority: body.Priority,
    Title: body.Title,
    Days: body.Days,
    Hours: body.Hours,
    DueTime: body.DueTime,
    EarliestDate: body.EarliestDate,
    Description: body.Description,
  };
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { Tasks: { Scheduled: true } }, $set: { Overlapping: [] } },
    (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      } else {
        console.log("blah");
      }
    }
  );
  User.updateOne(
    { _id: req.params.id },
    { $push: { ScheduledTasks: newTask } },
    (err, user) => {
      if (err) {
        console.log("ERROR FINDING ASSOCIATED USER asnd add schedule");
      } else {
        return res.status(200).json({
          success: true,
          data: user,
          message: "User schedule Tasks updated!",
        });
      }
    }
  );
};

updateUser = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    console.log(body);
    user.Email = body.Email;
    user.FieldOfResearch = body.FieldOfResearch;
    user.Interests = body.Interests;
    user.Skills = body.Skills;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user.id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

getAllUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

initializeId = () => {
  var id = "";
  var i;
  var random;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      id += "-";
    }
    id += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return id;
};

removeOverlapping = async (req,res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $pull: {
        Overlapping: { TaskId: body.id },
        ScheduledTasks: { TaskId: body.id },
      },
    }
  )
};

module.exports = {
  createUser,
  login,
  changeUserPassword,
  getUserById,
  updateUser,
  getAllUsers,
  followUser,
  unfollowUser,
  getFollowersById,
  getFollowingById,
  getFollowingQuestionsById,
  getFollowingResearchesById,
  validateEmail,
  updateChanges,
  addScheduledTask,
  removeOverlapping
};
