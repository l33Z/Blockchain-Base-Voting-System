const express = require("express");
const Admin = require("../models/adminModal");
const router = express.Router();
const bcrypt = require("bcrypt");
router.use(express.json());

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
      res.status(200).json("Login successful");
    } else {
      res.status(401).json("Login failed Invalid Cradentials");
    }
  } else {
    res.status(400).json("Login failed Invalid Cradentials");
  }
});

//////////////////////////////////// FOR ADDING NEW ADMIN //////////////////////////////////
router.post("/api/addadmin", async (req, res) => {
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
