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
    const {
      amount,
      subTotal,
      product,
      address,
      quantity,
      recommendation,
      monthly_repeat,
    } = req.body;
    const ord_object = Order({
      userId: req.user._id,
      totalAmount: amount,
      subTotal,
      product: product,
      address,
      payment_status: "pending",
      payment_details: null,
      order_status: "pending",
      order_on: Date.now(),
      quantity: parseInt(quantity),
      recommendation,
      monthly_repeat: monthly_repeat,
      last_repeat: Date.now(),
    });
    await ord_object.save();

    const instance = new Razorpay({
      key_id: "rzp_test_PJfxwmlLINbRMG",
      key_secret: "GtUxRvzjTprUj5HAua63rIwK",
    });

    const ord_options = {
      amount: parseInt(amount) * 100,
      currency: "INR",
      payment_capture: 1,
    };

    const order = await instance.orders.create(ord_options);
    res.json(resObj(true, { order, ord_object }, "Order created"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
