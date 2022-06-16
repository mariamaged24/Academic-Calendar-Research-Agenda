const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },

  Password: {
    type: String,
    required: true,
  },

  FirstName: {
    type: String,
    required: true,
  },

  LastName: {
    type: String,
    required: true,
  },

  Country: {
    type: String,
    required: true,
  },

  University: {
    type: String,
    required: true,
  },

  FieldOfStudy: {
    type: String,
    required: true,
  },

  FieldOfResearch: {
    type: String,
    required: true,
  },

  Interests: [
    {
      type: String,
    },
  ],

  Skills: [
    {
      type: String,
    },
  ],

  Followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  Following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  Tasks: [
    {
      TaskId: {
        type: String,
        required: true,
        unique: true,
      },
      Start: {
        type: Date,
        required: true,
      },
      End: {
        type: Date,
        required: true,
      },
      Title: {
        type: String,
        required: true,
      },
      Scheduled: {
        type: Boolean,
        default: false,
        required: true,
      },
      Priority: {
        type: Number,
      },
      Description: {
        type: String,
      },
    },
  ],

  ScheduledTasks: [
    {
      TaskId: {
        type: String,
        required:true,
        unique: true,
      },
      Priority: {
        type: Number,
        required: true,
      },
      Title: {
        type: String,
        required: true,
      },
        Days: {
          type: Number,
          required: true,
        },

        Hours: {
          type: Number,
          required: true,
        },

      DueTime: {
        type: Date,
        required: true,
      },

      EarliestDate: {
        type: Date,
        required: true,
      },
      Description: {
        type: String,
      },
    },

  ],

  Overlapping: [
    {
      TaskId: {
        type: String,
        required: true,
        unique: true,
      },
      Priority: {
        type: Number,
        required: true,
      },
      Title: {
        type: String,
        required: true,
      },
      Days: {
        type: Number,
        required: true,
      },

      Hours: {
        type: Number,
        required: true,
      },

      DueTime: {
        type: Date,
        required: true,
      },

      EarliestDate: {
        type: Date,
        required: true,
      },
      Description: {
        type: String,
      },
    },
  ],

  Questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],

  Researches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Research",
    },
  ],
});

UserSchema.post("updateOne", function (documents, next) {
  User.findOne(this._conditions).then((user) => {
    var tasks = user.ScheduledTasks;
    var allTasks = user.Tasks;
    var sortedPriorities = quickSort(tasks, 0, tasks.length - 1);

    for (let i = 0; i < sortedPriorities.length; i++) {
      var overlap = false;
      var scheduled = false;
      var task = sortedPriorities[i];
      var copy = new Date(task.DueTime.getTime());
      var start = new Date();
      var end = new Date(task.DueTime.getTime());
      start = new Date(
        copy.setDate(
          new Date(
            copy.setHours(copy.getHours() - task.Hours)
          ).getDate() - task.Days
        )
      );
      console.log("scheduling", task)
console.log("start", start)
console.log("end", end)
      while (
        new Date(start.getTime()) >= new Date(task.EarliestDate.getTime())
      ) {
        console.log("start", start)
        console.log("end", end)
        for (let k = 0; k < allTasks.length; k++) {
          console.log("testing", allTasks[k])
          console.log("condition", start <= allTasks[k].End && end >= allTasks[k].Start)
          if (start <= allTasks[k].End && end >= allTasks[k].Start) {
            console.log("overlap", overlap)
            overlap = true;
            break;
          }
        }
        if (overlap) {
          end = new Date(end.setDate(end.getDate() - 1));
          start = new Date(start.setDate(start.getDate() - 1));
        } else {
          scheduled = true;
          var pushedTask = {
            TaskId: task.TaskId,
            Start: start,
            End: end,
            Title: task.Title,
            Scheduled: true,
            Priority: task.Priority,
            Description: task.Description,
          };
          allTasks.push(pushedTask);
          User.findOneAndUpdate(
            { _id: user._id },
            {
              $push: { Tasks: pushedTask },
            },
            (err) => {
              if (err) {
                console.log(err, "Problem pushing Task");
              }
            }
          );
          break;
        }
        overlap = false;
      }

      if (!scheduled) {
        console.log("SUGGESTTTT");
        console.log(user._id, "idddd");
        var overlapTask = {
          TaskId: task.TaskId,
          Title: task.Title,
          DueTime: task.DueTime,
          EarliestDate: task.EarliestDate,
          Days: task.Days,
          Hours: task.Hours,
          Priority: task.Priority,
          Description: task.Description,
        };
        User.findOneAndUpdate(
          { _id: user._id },
          { $push: { Overlapping: overlapTask } },
          (err) => {
            if (err) {
              console.log(err, "Problem pushing overlapp Task");
            }
          }
        );
      }
    }
  });

  next();
});

// getSuggestions = (task, allTasks, userId) => {
//   console.log(userId);
//   var suggestArray = [];
//   for (let i = 0; i < allTasks.length; i++) {
//     if (
//       task.EarliestDate <= allTasks[i].End &&
//       task.DueTime >= allTasks[i].Start
//     ) {
//       suggestArray.push({
//         OverlapId: task.TaskId,
//         Overlap: task.Title,
//         Title: allTasks[i].Title,
//         Start: allTasks[i].Start,
//         End: allTasks[i].End,
//       });
//       console.log(suggestArray);
//     }
//   }
//   User.findOneAndUpdate(
//     { _id: userId },
//     { Suggestions: suggestArray },
//     (err, user) => {
//       if (err) {
//         console.log(err, "PROBLEM SUGGESTIONNNNNNN");
//       } else {
//         console.log(user);
//       }
//     }
//   );
// };

quickSort = (tasksArray, leftIndex, rightIndex) => {
  var index;
  if (tasksArray.length > 1) {
    index = partition(tasksArray, leftIndex, rightIndex);
    if (leftIndex < index - 1) {
      quickSort(tasksArray, leftIndex, index - 1);
    }
    if (index < rightIndex) {
      quickSort(tasksArray, index, rightIndex);
    }
  }
  return tasksArray;
};

partition = (tasksArray, leftIndex, rightIndex) => {
  var pivotTask = tasksArray[Math.floor((leftIndex + rightIndex) / 2)];
  var i = leftIndex;
  var j = rightIndex;
  while (i <= j) {
    while (tasksArray[i].Priority < pivotTask.Priority) {
      i++;
    }
    while (tasksArray[j].Priority > pivotTask.Priority) {
      j--;
    }
    if (i <= j) {
      swap(tasksArray, i, j);
      i++;
      j--;
    }
  }
  return i;
};

swap = (tasksArray, leftIndex, rightIndex) => {
  var temp = tasksArray[leftIndex];
  tasksArray[leftIndex] = tasksArray[rightIndex];
  tasksArray[rightIndex] = temp;
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

module.exports = User = mongoose.model("User", UserSchema);
