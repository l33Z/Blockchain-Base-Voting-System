const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    CandidateName: {
      type: String,
      required: true,
    },
    CandidatePartyName: {
      type: String,
      required: true,
    },
    CandidateAge: {
      type: Number,
      required: true,
    },
    CandidateImage: {
      // data: Buffer,
      // contentType: String,
      type: String,
      required: true,
    },
    TotalVotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Candidate = new mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
