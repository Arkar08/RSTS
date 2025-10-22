import mongoose from "mongoose";

const advertisingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Advertising = mongoose.model("Advertising", advertisingSchema);

export default Advertising;

//example data
// {
//     "title":"example",
// }