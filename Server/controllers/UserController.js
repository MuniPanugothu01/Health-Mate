const bcrypt = require("bcrypt");
const { UserModel } = require("../models/UserModel");
const validator = require("validator");

const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, gender, emailId, password } = req.body;

    if (!firstName || !lastName || !gender || !emailId || !password) {
      return res.status(400).json({ ERROR: "All fields are required" });
    }

    if (!validator.isEmail(emailId)) {
      return res.status(400).json({ ERROR: "Invalid email format" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ ERROR: "Weak password!" });
    }

    const existingUser = await UserModel.findOne({ emailId });
    if (existingUser) {
      return res.status(409).json({ ERROR: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstName,
      lastName,
      gender,
      emailId,
      password: hashedPassword,
    });

    const userSaved = await newUser.save();
    res.status(200).json({ status: 200, message: userSaved });
  } catch (error) {
    console.log("Signup error:", error.message);
    res.status(500).json({ status: 500, ERROR: error.message });
  }
};

module.exports = {
  userRegister,
};
