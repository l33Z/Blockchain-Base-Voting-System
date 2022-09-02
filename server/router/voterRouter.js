const express = require("express");
const router = express.Router();
const Voter = require("../models/voterModel");
const Candidate = require("../models/candidateModel");
const bcrypt = require("bcrypt");
const authentication = require("../middleware/autheniticate");
const adminAuthentication = require("../middleware/authenticationForAdmin");

router.use(express.json());

//////////////////////////////////// FOR WELCOME PAGE //////////////////////////////////
router.get("/api/welcomee", authentication, (req, res) => {
  res.status(200).send(req.currentVoterName);
});

//////////////////////////////////// FOR LOGOUT PAGE //////////////////////////////////
router.get("/api/logout", (req, res) => {
  res.clearCookie("jwt_token");
  res.status(200).send("Logout Successfully");
});

//////////////////////////////////// FOR ALL VOTERLIST //////////////////////////////////
router.get("/api/admin/allvoters", adminAuthentication, async (req, res) => {
  const allVoters = await Voter.find({});
  if (allVoters.length == 0) {
    res.status(400).json("No Candidate found");
  } else {
    res.status(200).json(allVoters);
  }
});

//////////////////////////////////// FOR REGISTER PAGE //////////////////////////////////

// router.get("/api/registervoter", async (req, res) => {
//   const allVoters = await Voter.find({});
//   res.send(allVoters);
// });

router.post("/api/registervoter", async (req, res) => {
  const { firstname, lastname, email, phoneno, password, cpassword } = req.body;
  const existEmail = await Voter.find({ email });

  if (existEmail.length > 0) {
    res.status(409).json(email + " already exist !!");
  } else {
    if (password !== cpassword) {
      res.send("passwords are not matching").status(400);
    } else {
      const newHashPassword = await bcrypt.hash(password.toString(), 10);
      const newVoter = new Voter({
        firstname,
        lastname,
        phoneno,
        email,
        password: newHashPassword,
        cpassword,
      });
      const result = await newVoter.save();
      res.send(JSON.stringify(result)).status(201);
    }
  }
});

//////////////////////////////////// FOR LOGIN //////////////////////////////////

// router.get("/api/loginvoter", async (req, res) => {
//   const allVoters = await Voter.find({}, ["email", "password"]);
//   res.send(allVoters).status(200);
// });

router.post("/api/loginvoter", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  const findVoter = await Voter.findOne({ email: email });
  if (findVoter !== null) {
    const validPassword = await bcrypt.compare(
      password.toString(),
      findVoter.password
    );

    if (validPassword) {
      // Calling Generating Function From VoterSchema
      const token = await findVoter.generateToken();

      res.cookie("jwt_token", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });

      res.status(200).json("Login successful");
    } else {
      res.status(401).json("Login failed Invalid Cradentials");
    }
  } else {
    res.status(400).json("Email not found");
  }
});

//////////////////////////////////// FOR VOTE REGISTRATION //////////////////////////////////
router.get("/api/voteregistration", authentication, (req, res) => {
  res.status(200).send(req.currentVoterId);
});

router.post("/api/voteregistration", async (req, res) => {
  try {
    const { cid, adharCard, voterno, birthdate, age, city, rstate, address } =
      req.body;

    const findVoter = await Voter.findOne({ _id: cid });

    const voterIdExists = await Voter.findOne({ voterId: voterno });
    // console.log(voterIdExists);
    if (voterIdExists === null) {
      findVoter.adharCard = adharCard;
      findVoter.voterId = voterno;
      findVoter.age = age;
      findVoter.birthDate = birthdate;
      findVoter.city = city;
      findVoter.rstate = rstate;
      findVoter.address = address;
      findVoter.save();
      res.status(201).json(voterno);
    } else {
      res.status(409).json("Voter Id " + voterno + " already available !!");
    }
  } catch (e) {
    res.status(400).json("Somthing Went Wrong !!");
  }
});

//////////////////////////////////// FOR VOTE UPDATION //////////////////////////////////
// router.get("/api/currentvoter", authentication, async (req, res) => {
//   res.send(req.currentVoterName);
// });

router.post("/api/currentvoter", authentication, async (req, res) => {
  try {
    const currentVoter = await Voter.findOne({ _id: req.currentVoterId });
    // console.log(currentVoter);
    console.log(currentVoter.voterId);
    if (currentVoter.voterId === undefined) {
      res.status(400).json("Please Register First For Vote");
    } else {
      if (currentVoter.isVoted) {
        res.status(401).json("You Already voted for this Election");
      } else {
        currentVoter.isVoted = true;
        currentVoter.save();
        res.status(201).json(currentVoter.voterId);
      }
    }
  } catch (e) {
    res.status(400).json("Somthing Went Wrong !!");
  }
});

module.exports = router;
