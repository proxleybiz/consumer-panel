import dbConnect from "../../utils/dbConnect";
import Subscription from "../../models/subscription";
import resObj from "../../utils/resObj";

const func = async (req, res) => {
  try {
    await dbConnect();
    const { email } = req.body;
    let temp = await Subscription.findOne({ email });
    if (!temp) {
      temp = Subscription({ email });
      await temp.save();
    }
    return res.json(resObj(true, null, "Subscription Added"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
