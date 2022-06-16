const express = require("express");
const router = express.Router();
const userController = require("../../Controllers/UserController");
const middleware = require("../../Controllers/Middleware");

router.post("/createuser", userController.createUser);
router.post("/loginuser", userController.login);
router.put("/passwordchange/:id", middleware.verifyJwT, userController.changeUserPassword);
router.get("/getuser/:id", userController.getUserById)
router.put("/userupdate/:id", middleware.verifyJwT, userController.updateUser);
router.get("/getallusers", userController.getAllUsers)
router.put("/followuser/:id", middleware.verifyJwT, userController.followUser);
router.put("/unfollowuser/:id", middleware.verifyJwT, userController.unfollowUser);
router.get("/getfollowers/:id", middleware.verifyJwT, userController.getFollowersById)
router.get("/getfollowing/:id", middleware.verifyJwT, userController.getFollowingById)
router.get("/getfollowingquestions/:id", middleware.verifyJwT, userController.getFollowingQuestionsById)
router.get("/getfollowingresearch/:id", middleware.verifyJwT, userController.getFollowingResearchesById)
router.post("/checkemail", userController.validateEmail)
router.put("/updatetasks/:id", middleware.verifyJwT, userController.updateChanges);
router.put("/scheduledtasks/:id",middleware.verifyJwT, userController.addScheduledTask);
router.put("/removeoverlap/:id",middleware.verifyJwT, userController.removeOverlapping);

module.exports = router;