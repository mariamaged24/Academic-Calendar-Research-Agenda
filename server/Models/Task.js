const mongoose = require("mongoose");
const User = require("./User");
const TaskSchema = new mongoose.Schema({ 
    AssociatedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    TaskName: {
        type: String,
        required: true,
    },

    Duration:{
         Days: {
             type: Number,
             required: true,
         },

         Hours: {
            type: Number,
            required: true,
        }
    },

    DueTime: {
        type: Date,
        required: true,
    },

    Priority: {
        type: Number,
        required: true,
    },
    StartingSlot: {
        type: Date,
    },

   FinishingSlot: {
        type: Date,
    },

    Notes: {
        type: String,
    },

    Progress: {
        type: String,
        required: true,
    }
})


TaskSchema.post("save", (task, next) => {
    //const addTask = {$push: {Tasks: {TaskId: task._id, Priority: task.Priority}}}
    User.findOne({_id: task.AssociatedUser}, (err, user)=>{
            if (err) {
              console.log("ERROR FINDING ASSOCIATED USER");
            }
            else {
                var identifiedTasks  = user.Tasks;
                var flag = false;
                for(let i = 0;i<identifiedTasks.length;i++){
                    if(identifiedTasks[i].TaskId == task._id){
                        flag  = true;
                    }
                }
                if(!flag){
                    var newTask = {TaskId: task._id, Priority: task.Priority}
                    User.updateOne({_id: task.AssociatedUser},{$push: {Tasks: newTask}}, (err, user)=>{
                        if (err) {
                            console.log("ERROR FINDING ASSOCIATED USER");
                        }
                        else{
                            var arrayLength = user.Tasks.length
                            var sortedArray = quickSort(user.Tasks, 0, arrayLength - 1)
                            User.updateOne({_id: task.AssociatedUser}, {Tasks: sortedArray}), (err, user)=>{
                                if(err){
                                    console.log("ERROR REPLACING ARRAY")
                                }
                                else{
                                    for(let i = arrayLength - 1; i>=0; i--){
                                         Task.findById()
                                    }
                                }
                            }
                        }
                    })
                }
            }
          
    })
    next();
})

quickSort = (tasksArray, leftIndex, rightIndex)=>{
    var index;
    if(tasksArray.length > 1){
        index  = partition(tasksArray, leftIndex, rightIndex);
        if(leftIndex < index - 1){
            quickSort(tasksrray, leftIndex, index - 1);
        }
        if(ndex < right){
             quickSort(tasksrray, index, rightIndex);
        }
    }
    return tasksArray;
 }

 partition = (tasksArray, leftIndex, rightIndex)=>{
     var pivotTask = tasksArray[Math.floor((leftIndex + rightIndex)/2)].Priority;
     var i = leftIndex;
     var j = rightIndex;
     while(i <= j){
         while(tasksArray[i].Priority  < pivotTask){
             i++;
         }
         while(tasksArray[j].Priority  > pivotTask){
            j--;
        }
        if(i <= j){
            swap(tasksArray, i, j);
            i++;
            j--;
        }
     }
     return i;
 }

 swap = (tasksArray, leftIndex, rightIndex)=>{
     var temp = tasksArray[leftIndex];
     tasksArray[leftIndex] = tasksArray[rightIndex];
     tasksArray[rightIndex] = temp;
 }

module.exports = Task = mongoose.model("task", TaskSchema);