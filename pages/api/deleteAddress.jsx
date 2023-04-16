import dbConnect from "../../utils/dbConnect";
const { default: resObj } = require("../../utils/resObj");
const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import bcrypt from "bcryptjs";
import NextCors from "nextjs-cors";
import { METHODS, ORIGINS } from "../../utils/constants";
import authenticatedRequest from "../../utils/authenticatedRequest";
import mongoose from "mongoose";

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
    const { id } = req.body;
    console.log(id);
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.json(resObj(false, null, "User Not Found"));
    }
    user.address = user.address.filter((i) => i._id.toString() !== id);
    await user.save();
    return res.json(resObj(true, user.address, "Address Deleted"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
