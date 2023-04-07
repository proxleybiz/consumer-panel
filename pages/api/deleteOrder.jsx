import authenticatedRequest from "../../utils/authenticatedRequest";
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";
import Razorpay from "razorpay";
import Order from "../../models/orders";
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
    const { id } = req.body;
    await Order.findByIdAndDelete(id);
    res.json(resObj(true, null, "Order created"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
