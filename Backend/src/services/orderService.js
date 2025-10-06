import Users from "../models/userSchema.js";
import Orders from "../models/orderSchema.js";

export const findEmailService = async (data) => {
  const findEmail = await Users.findById({ _id: data.userId });
  return findEmail;
};

export const createOrderService = async (data) => {
  const newOrder = await Orders.create({
    userId: data.userId,
    products: data.products,
    totalPayment: data.totalPayment,
    delivery: data.delivery,
    status:data.status
  });
  return newOrder;
};

export const findOrderService = async () => {
  const sortBy = { updatedAt: -1 };

  const getOrder = await Orders.find({}).skip(0).limit(10).sort(sortBy);

  const findEmail = getOrder.map((order) => order.userId);
  const email = await Users.find({ _id: findEmail });

  const emailObject = {};
  email.forEach((emailList) => {
    return (emailObject[emailList._id] = emailList.email);
  });

  const orders = getOrder.map((order) => {
    const email = emailObject[order.userId] || "Unknown";

    const lists = { ...order.toObject(), email: email };

    return lists;
  });

  const total = await Orders.countDocuments();
  return {
    data: orders,
    currentPage: 1,
    totalPages: Math.ceil(total / 10),
    totalItems: total,
  };
}

export const paginationOrderService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const sortBy = {updatedAt: - 1}
  const getOrder = await Orders.find({}).skip(skip).limit(limit).sort(sortBy);

  const findEmail = getOrder.map((order) => order.userId);
  const email = await Users.find({ _id: findEmail });

  const emailObject = {};
  email.forEach((emailList) => {
    return (emailObject[emailList._id] = emailList.email);
  });

  const orders = getOrder.map((order) => {
    const email = emailObject[order.userId] || "Unknown";

    const lists = { ...order.toObject(), email: email };

    return lists;
  });

  const total = await Orders.countDocuments();
  return {
    data: orders,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };
};

export const findOneOrderService = async (data) => {
  const findOrder = await Orders.findById({ _id: data });
  const user = await Users.findById({ _id: findOrder.userId });

  const list = { ...findOrder.toObject(), email: user.email,name:user.name };

  return list;
};


export const findUserOrderService = async(data) => {
  const sortBy = {paymentDate: - 1}
  const findOrder = await Orders.find({userId:data.userId}).sort(sortBy);
  return findOrder;
}