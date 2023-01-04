import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/split")

const paymentDetailSchema=new mongoose.Schema({
  name:String,
  amount:String
})
const Details=mongoose.model("Detail",paymentDetailSchema);
export default Details;