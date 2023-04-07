import dbConnect from "../../utils/dbConnect";
const { default: resObj } = require("../../utils/resObj");
const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";
import NextCors from "nextjs-cors";
import { METHODS, ORIGINS } from "../../utils/constants";
import authenticatedRequest from "../../utils/authenticatedRequest";

const func = async (req, res) => {
  try {
    await dbConnect();
    await NextCors(req, res, {
      methods: METHODS,
      origin: ORIGINS,
      optionsSuccessStatus: 200,
    });
    const auth = await authenticatedRequest(req, res);
    if (!auth.res) {
      return res.json(resObj(false, null, auth.msg));
    }
    const {
      companyName,
      companyGST,
      businessCategory,
      businessAddress,
      designation,
      accountNumber,
      name,
    } = req.body;
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.json(resObj(false, null, "User Not Found"));
    }
    user.companyName = companyName;
    user.companyGST = companyGST;
    user.businessCategory = businessCategory;
    user.businessAddress = businessAddress;
    user.designation = designation;
    user.accountNumber = accountNumber;
    user.name = name;
    user.profileCompleted = true;
    await user.save();
    delete user.password;
    return res.json(resObj(true, user, "User Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
