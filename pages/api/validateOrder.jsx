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
    const { id, payment } = req.body;
    let order = await Order.findById(id);
    if (!order) {
      return res.json(resObj(false, null, "No Order Found"));
    }
    if (order.userId !== req.user._id.toString()) {
      return res.json(resObj(false, null, "Operation out of bounds"));
    }
    order.payment_status = "paid";
    order.payment_details = payment;
    order.order_status = "ordered";
    await order.save();
    res.json(resObj(true, order, "Order Validated"));
  } catch (err) {
    console.log(err);
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
