const express = require("express");
const router = express.Router();
const questionController = require("../../Controllers/QuestionController");
const middleware = require("../../Controllers/Middleware");

router.post("/createquestion",middleware.verifyJwT, questionController.createQuestion);
router.get("/getallquestions", questionController.getAllQuestions)
router.get("/getquestions/:id", middleware.verifyJwT, questionController.getQuestionsById)
router.put("/updatequestion/:id", middleware.verifyJwT, questionController.updateQuestion)
router.delete("/deletequestion/:id", middleware.verifyJwT, questionController.deleteQuestion)

module.exports = router;