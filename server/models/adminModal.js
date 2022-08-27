const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    AdminName: {
      type: String,
      required: true,
    },
    AdminUserName: {
      type: String,
      required: true,
    },

    AdminPassword: {
      type: String,
      required: true,
    },
    AdminConfirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const Admin = new mongoose.model("Admin", AdminSchema);

module.exports = Admin;
