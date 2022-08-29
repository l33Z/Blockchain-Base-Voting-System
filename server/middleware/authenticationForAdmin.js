const Admin = require("../models/adminModal");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const Adminauthentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_admin_token;

    const verifyToken = jwt.verify(token, process.env.Token_Private_Key);

    const currentAdmin = await Admin.findOne({
      _id: verifyToken.id,
      "Tokens:token": token,
    });

    if (!currentAdmin) {
      res.status(401);
      throw new Error("Admin not found");
    }

    req.token = token;
    req.currentAdmin = currentAdmin;
    req.currentAdminName = currentAdmin.AdminName;
    req.currentAdminId = currentAdmin._id;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json("Token Not Found Please Login First");
  }
};

module.exports = Adminauthentication;
