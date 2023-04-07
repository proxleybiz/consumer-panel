import authenticatedRequest from "../../utils/authenticatedRequest";
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";
import bcrypt from "bcryptjs";
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
    const { password } = req.body;
    if (!password.newPassword || password.newPassword.length < 6) {
      return res.json(
        resObj(false, null, "Minimum length of passwors should be 6.")
      );
    }
    let user = await User.findById(req.user._id);
    if (user.password !== "") {
      const result = await bcrypt.compare(password.oldPassword, user.password);
      if (!result) {
        return res.json(resObj(false, null, "Wrong Password"));
      }
    }
    const encryptedPassword = await bcrypt.hash(password.newPassword, 10);
    user.password = encryptedPassword;
    await user.save();
    delete user.password;
    return res.json(resObj(true, user, "Password Updated"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
