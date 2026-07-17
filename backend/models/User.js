const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    isVerified: {
    type: Boolean,
    default: false,
},

verificationToken: {
    type: String,
},

resetPasswordToken: {
    type: String,
},

resetPasswordExpires: {
    type: Date,
},
  },


  {
    versionKey: false,
  }


);

module.exports = mongoose.model("User", userSchema);