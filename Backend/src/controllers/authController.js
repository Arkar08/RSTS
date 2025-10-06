import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { findEmailService, findNameService, findPhoneNumberService, postUserService } from "../services/authService.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Please Filled Out in the form field." });
  }

  try {
    const data = {
        email:email,
        password:password
    }
    const validatorEmail = await findEmailService(data)
    if (!validatorEmail) {
      return res.status(404).json({
        message: "Email is wrong",
      });
    }
    if (validatorEmail) {
      if (!validatorEmail.isActive) {
        return res
          .status(400)
          .json({
            message: "Your account is locked and Inactive User.Plz Contact to RSTS Vintage Team.",
          });
      }
      const validatorPassword = await bcrypt.compare(
        password,
        validatorEmail.password
      );
      if (!validatorPassword) {
        return res.status(404).json({
          message: "Password is wrong",
        });
      }
      if (validatorPassword) {
        const token = await generateToken(validatorEmail._id, res);
        return res.status(200).json({
          message: "Login Successfully",
          email: validatorEmail.email,
          _id: validatorEmail._id,
          role: validatorEmail.role,
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signupController = async (req, res) => {
  const { email, name, password, phoneNumber } = req.body;
  if (!email || !name || !password) {
    return res
      .status(404)
      .json({ message: "Please Filled Out in the form field." });
  }
  try {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const data = {
        email:email,
        name:name,
        password:hashPassword,
        phoneNumber:phoneNumber
    }
    const findEmail = await findEmailService(data)
    if (findEmail) {
      return res.status(400).json({
        message: "Email is already exist.",
      });
    }
    const findName = await findNameService(data)
    if (findName) {
      return res.status(400).json({
        message: "Name is already exist.",
      });
    }
    const findPhoneNumber = await findPhoneNumberService(data)
    if (findPhoneNumber) {
      return res.status(400).json({
        message: "PhoneNumber is already exist.",
      });
    }
    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password should be greather than 6." });
    }

    const user = await postUserService(data)

    if (user) {
      const token = await generateToken(user._id, res);
      return res.status(200).json({
        message: "Signup Successfully",
        email: user.email,
        _id: user._id,
        role: user.role,
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutController = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: new Date(0),
  });
  return res.status(200).json({ message: "Logout Successfully." });
};