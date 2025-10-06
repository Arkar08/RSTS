import Users from "../models/userSchema.js";


export const findAllUserService = async() => {
  const sortBy = { updatedAt: -1 };
    const getUser = await Users.find({}).skip(0).limit(10).sort(sortBy);
    const total = await Users.countDocuments();
    return {
      data: getUser,
      currentPage: 1,
      totalPages: Math.ceil(total / 10),
      totalItems: total,
    };
}


export const paginateUserService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const sortBy = {updatedAt: - 1}
  const getUser = await Users.find({}).skip(skip).limit(limit).sort(sortBy);
  const total = await Users.countDocuments();
  return {
    data: getUser,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };
};

export const findUserListService = async (data) => {
  const user = await Users.find({});
  const list = user.filter((cat) =>
    cat.name?.toLowerCase().includes(data.search.toLowerCase() || cat.email?.toLowerCase().includes(data.search.toLowerCase()))
  );
  return list;
};

export const findOneUserService = async(data)=>{
  const user = await Users.findById({_id:data.id})
  return user;
}

export const statusChangeService = async (data) => {
  const statusChange = await Users.findOneAndUpdate(
    { _id: data.id },
    { isActive: data.status},
    { new: true, runValidators: true }
  );
  return statusChange;
};