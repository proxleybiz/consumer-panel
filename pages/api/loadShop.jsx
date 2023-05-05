const Shop = require("../../models/shop");
import dbConnect from "../../utils/dbConnect";
import resObj from "../../utils/resObj";

const func = async (req, res) => {
  try {
    await dbConnect();
    const shop = await Shop.find();
    if (!shop || shop.length === 0) {
      return res.json(resObj(false, null, "Cannot Load Shop Right Now"));
    }
    return res.json(resObj(true, shop[0], "Shop Loaded"));
  } catch (err) {
    return res.json(resObj(false, null, err.toString()));
  }
};

export default func;
