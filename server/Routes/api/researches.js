const express = require("express");
const router = express.Router();
const researchController = require("../../Controllers/ResearchController");
const middleware = require("../../Controllers/Middleware");

router.post("/createresearch", middleware.verifyJwT, researchController.createResearch);
router.get("/getallresearches", researchController.getAllResearches)
router.get("/getresearches/:id", middleware.verifyJwT, researchController.getResearchesById)
router.put("/updateresearch/:id", middleware.verifyJwT, researchController.updateResearch)
router.delete("/deleteresearch/:id", middleware.verifyJwT, researchController.deleteResearch)

module.exports = router;