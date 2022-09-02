const express = require("express");
const Admin = require("../models/adminModal");
const Candidate = require("../models/candidateModel");

const router = express.Router();
const bcrypt = require("bcrypt");
const Adminauthentication = require("../middleware/authenticationForAdmin");
router.use(express.json());

//////////////////////////////////// FOR WELCOME PAGE //////////////////////////////////
router.get("/api/admin/welcomee", Adminauthentication, (req, res) => {
  res.status(200).json(req.currentAdminName);
});

//////////////////////////////////// FOR LOGOUT PAGE //////////////////////////////////
router.get("/api/alogout", (req, res) => {
  res.clearCookie("jwt_admin_token");
  res.status(200).send("Logout Successfully");
});

//////////////////////////////////// FOR ALL CANDIDATES LIST PAGE //////////////////////////////////
router.get(
  "/api/admin/allcandidates",
  Adminauthentication,
  async (req, res) => {
    const allCamdidates = await Candidate.find({});
    if (allCamdidates.length == 0) {
      res.status(404).json("No Candidate found");
    } else {
      res.status(200).json(allCamdidates);
    }
  }
);

//////////////////////////////////// FOR ADMIN RESULT PAGE //////////////////////////////////
router.get(
  "/api/admin/resultcandidates",
  Adminauthentication,
  async (req, res) => {
    const allCamdidates = await Candidate.find({}).sort({ TotalVotes: -1 });
    if (allCamdidates.length == 0) {
      res.status(400).json("No Candidate found");
    } else {
      res.status(200).json(allCamdidates);
    }
  }
);

//////////////////////////////////// FOR LOGIN ADMIN //////////////////////////////////
router.post("/api/adminlogin", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const findAdmin = await Admin.findOne({ AdminUserName: username });

  if (findAdmin !== null) {
    const validPassword = await bcrypt.compare(
      password.toString(),
      findAdmin.AdminPassword
    );
    if (validPassword) {
      // Calling Generating Function From VoterSchema
      const token = await findAdmin.generateToken();

      res.cookie("jwt_admin_token", token, {
        expires: new Date(Date.now() + 86400000),
        httpOnly: true,
      });

      res.status(200).json("Login successful");
    } else {
      res.status(401).json("Login failed Invalid Cradentials");
    }
  } else {
    res.status(400).json("Login failed Invalid Cradentials");
  }
});

//////////////////////////////////// FOR ADDING NEW ADMIN //////////////////////////////////
router.get("/api/admin/addadmin", Adminauthentication, async (req, res) => {
  res.status(200).json(req.currentAdminName);
});
router.post("/api/admin/addadmin", async (req, res) => {
  const { adminname, username, password, cpassword } = req.body;
  console.log("From Frontend :");
  console.log(req.body);

  const existUserName = await Admin.findOne({ AdminUserName: username });
  console.log(existUserName);
  if (existUserName !== null) {
    res.status(409).json(username + " already exist !!");
  } else {
    if (password !== cpassword) {
      res.status(400).json("passwords are not matching");
      return;
    }

    const newHashPassword = await bcrypt.hash(password.toString(), 10);

    const newAdmin = new Admin({
      AdminName: adminname,
      AdminUserName: username,
      AdminPassword: newHashPassword,
      AdminConfirmPassword: cpassword,
    });
    const result = await newAdmin.save();
    console.log(result);
    res.status(201).json("Successfully added " + username);
  }
});

module.exports = router;
