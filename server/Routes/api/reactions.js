const express = require("express");
const router = express.Router();
const reactionController = require("../../Controllers/ReactionController");
const middleware = require("../../Controllers/Middleware");

router.post("/createreaction", middleware.verifyJwT, reactionController.createReaction);
router.put("/updatereaction/:id", middleware.verifyJwT, reactionController.updateReaction)
router.put("/helpful/:id", middleware.verifyJwT, reactionController.incrementHelpfulById)
router.put("/nothelpful/:id", middleware.verifyJwT, reactionController.decrementHelpfulById)
router.delete("/deletereaction/:id", middleware.verifyJwT, reactionController.deleteReaction)

module.exports = router;