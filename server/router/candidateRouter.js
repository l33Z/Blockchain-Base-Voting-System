const express = require("express");
const Candidate = require("../models/candidateModel");
const router = express.Router();
const multer = require("multer");

//////////////////////////////// FOR STORING IMAGES //////////////////////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//////////////////////////////////// FOR ADDING CANDIDATES //////////////////////////////////
router.post(
  "/api/addcandidate",
  upload.single("CandidateImage"),
  async (req, res) => {
    try {
      const { CandidateName, CandidatePartyName, CandidateAge } = req.body;

      const newCandidate = await Candidate({
        CandidateName,
        CandidatePartyName,
        CandidateAge,
        CandidateImage: req.file.filename,
      });
      const result = await newCandidate.save();
      res.status(201).json("Successfully Added Candidate");
    } catch (err) {
      res.status(500).json("Somthing Went Wrong");
    }
  }
);

//////////////////////////////////// FOR CANDIDATES LIST //////////////////////////////////
router.get("/api/allcandidates", async (req, res) => {
  const allCamdidates = await Candidate.find({});
  if (allCamdidates.length == 0) {
    res.status(400).json("No Candidate found");
  } else {
    res.status(200).json(allCamdidates);
  }
});

module.exports = router;
