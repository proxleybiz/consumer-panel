import authenticatedRequest from "../../utils/authenticatedRequest";
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";
import User from "../../models/user";
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
    const auth = await authenticatedRequest(req, res);
    if (!auth.res) {
      return res.json(resObj(false, null, auth.msg));
    }
    let user = await User.findOne({ phoneNumber: req.body.phone });
    if (user) {
      return res.json(resObj(false, null, "Mobile Already Regsitered"));
    }
    user = await User.findById(req.user._id);
    user.phoneNumber = req.body.phone;
    await user.save();
    return res.json(resObj(true, user, "Phone Verified"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
