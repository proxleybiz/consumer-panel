import resObj from "./resObj";
import jwt_decode from "jwt-decode";
import User from "../models/user";
import dbConnect from "./dbConnect";

const authenticatedRequest = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      await dbConnect();
      const token = req.headers.accesstoken;
      if (!token || token === undefined) {
        resolve({ res: false, msg: "Invalid Access Token" });
      }
      const user = jwt_decode(token);
      if (!user) {
        resolve({ res: false, msg: "Invalid Access Token" });
      }
      const currentTime = Date.now();
      const exp = parseInt(user.exp) * 1000;
      if (exp <= currentTime) {
        resolve({ res: false, msg: "Invalid Access Token" });
      }
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = new User({
          name: user.name,
          email: user.email,
          joinedOn: currentTime,
          phoneNumber: "",
          orders: [],
          address: [],
          password: "",
          profileCompleted: false,
          companyName: "",
          companyGST: "",
          businessCategory: "",
          businessAddress: "",
          designation: "",
          accountNumber: "",
        });
        await dbUser.save();
      }
      delete dbUser.password;
      req.user = dbUser;
      resolve({ res: true, msg: "" });
    } catch (err) {
      resolve({ res: false, msg: err.toString() });
    }
  });
};

export default authenticatedRequest;
