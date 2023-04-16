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
    const { address } = req.body;
    let user = await User.findById(req.user._id);
    if (!user) {
      return res.json(resObj(false, null, "User Not Found"));
    }
    user.address = user.address.map((i) => {
      if (i._id.toString() === address._id.toString()) {
        return { ...address, _id: i._id };
      }
      return i;
    });
    await user.save();
    return res.json(resObj(true, user.address, "User Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
