const Voter = require("../models/voterModel");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;

    const verifyToken = jwt.verify(token, process.env.Token_Private_Key);

    const currentVoter = await Voter.findOne({
      _id: verifyToken.id,
      "Tokens:token": token,
    });

    if (!currentVoter) {
      res.status(401);
      throw new Error("Voter not found");
    }

    req.token = token;
    req.currentVoter = currentVoter;
    req.currentVoterName = JSON.stringify(
      currentVoter.firstname + " " + currentVoter.lastname
    );
    req.currentVoterId = currentVoter._id;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json("Token Not Found Please Login First");
  }
};

module.exports = authentication;
