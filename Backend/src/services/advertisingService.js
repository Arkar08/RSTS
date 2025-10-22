import Advertising from "../models/advertisingSchema.js";


export const findAllAdvertisingService = async () => {
  const sortBy = { updatedAt: -1 };
  const getAdvertising = await Advertising.find({}).sort(sortBy);
  const total = await Advertising.countDocuments();
  return {
    data: getAdvertising,
    totalItems: total,
  };
};

export const postAdvertisingService = async (data) => {
  const postAdvertising = await Advertising.create({
    title: data.title
  });
  return postAdvertising;
};

export const findOneAdvertisingService = async (data) => {
  const findAdvertising = await Advertising.findById({ _id: data });
  return findAdvertising;
};

export const updateOneAdvertisingService = async (data) => {
  const updateAdvertising = await Advertising.findOneAndUpdate(
    { _id: data.id },
    { title: data.title},
    { new: true, runValidators: true }
  );
  return updateAdvertising;
};

export const deleteAdvertisingService = async (data) => {
  const deleteAdvertising = await Advertising.findOneAndDelete({ _id: data.id });
  return deleteAdvertising;
};