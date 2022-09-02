const express = require("express");
const Candidate = require("../models/candidateModel");
const router = express.Router();
const authentication = require("../middleware/autheniticate");
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
      const { CandidateName, CandidatePartyName, CandidateAge, CandidateId } =
        req.body;

      const availableId = await Candidate.find({ CandidateId });
      if (availableId == 0) {
        const newCandidate = await Candidate({
          CandidateName,
          CandidatePartyName,
          CandidateAge,
          CandidateId,
          CandidateImage: req.file.filename,
        });
        const result = await newCandidate.save();
        res.status(201).json(result._id);
      } else {
        res.status(409).json(CandidateId + " already available");
      }
    } catch (err) {
      res.status(500).json("Somthing Went Wrong");
    }
  }
);

//////////////////////////////////// FOR CANDIDATES LIST //////////////////////////////////
router.get("/api/allcandidates", authentication, async (req, res) => {
  const allCamdidates = await Candidate.find({});
  if (allCamdidates.length == 0) {
    res.status(400).json("No Candidate found");
  } else {
    res.status(200).json(allCamdidates);
  }
});

//////////////////////////////////// FOR RESULT CANDIDATES LIST //////////////////////////////////
router.get("/api/resultcandidates", authentication, async (req, res) => {
  const allCamdidates = await Candidate.find({}).sort({ TotalVotes: -1 });
  if (allCamdidates.length == 0) {
    res.status(400).json("No Candidate found");
  } else {
    res.status(200).json(allCamdidates);
  }
});

//////////////////////////////////// FOR CANDIDATES UPDATE VOTES //////////////////////////////////
router.post("/api/countvotes", async (req, res) => {
  try {
    const currentcandidatename = req.body.currentcandidatename;

    const CurrentCandidate = await Candidate.findOne({
      CandidateName: currentcandidatename,
    });
    console.log(CurrentCandidate);
    CurrentCandidate.TotalVotes++;
    await CurrentCandidate.save();
    res.status(201).json({
      msg: "Your Vote Count Successfully for " + CurrentCandidate.CandidateName,
      ans: CurrentCandidate.CandidateId,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
