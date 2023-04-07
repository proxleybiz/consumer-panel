import dbConnect from "../../utils/dbConnect";
const { default: resObj } = require("../../utils/resObj");
const User = require("../../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import NextCors from "nextjs-cors";
import { METHODS, ORIGINS } from "../../utils/constants";

const func = async (req, res) => {
  try {
    await dbConnect();
    await NextCors(req, res, {
      methods: METHODS,
      origin: ORIGINS,
      optionsSuccessStatus: 200,
    });
    const { email, password } = req.body;
    const user = await User.findOne({
      $or: [{ email }, { phoneNumber: "+91" + email }],
    });
    if (!user) {
      return res.json(resObj(false, null, "No User Found"));
    }
    if (user.password.trim() === "") {
      return res.json(resObj(false, null, "Password isn't updated"));
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.json(resObj(false, null, "No User Found"));
    }
    delete user.password;
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      email: user.email,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json(resObj(true, token, "User Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
