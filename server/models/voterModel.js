const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const VoterSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
    registerDate: {
      type: Date,
      default: new Date(),
    },
    Tokens: [
      {
        token: {
          type: String,
        },
      },
    ],

    adharCard: {
      type: Number,
      
    },
    voterId: {
      type: Number,
    },
    age: {
      type: Number,
    },
    birthDate: {
      type: String,
    },
    city: {
      type: String,
    },
    rstate: {
      type: String,
    },
    address: {
      type: String,
    },
    isVoted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

////////////////// Generating Token //////////////////
VoterSchema.methods.generateToken = async function () {
  let token = await jwt.sign({ id: this.id }, process.env.Token_Private_Key);
  this.Tokens = this.Tokens.concat({ token });
  await this.save();
  return token;
};

const Voter = new mongoose.model("Voter", VoterSchema);

module.exports = Voter;
