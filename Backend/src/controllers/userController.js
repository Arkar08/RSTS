import mongoose from "mongoose";
import {
  findAllUserService,
  findOneUserService,
  findUserListService,
  paginateUserService,
  statusChangeService,
} from "../services/userService.js";

export const getAllUserController = async (req, res) => {
  try {
    const data = await findAllUserService();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Users Successfully.",
        data: data,
      });
    } else {
      return res.status(500).json({
        message: "Something Went Wrong.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const paginateUserController = async (req, res) => {
  const { page } = req.body;

  if (!page) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const user = await paginateUserService(page, 10);
    if (user) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Users Successfully.",
        data: user,
      });
    } else {
      return res.status(500).json({
        message: "Something Went Wrong.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const searchUserController = async (req, res) => {
  const { search } = req.body;

  if (!search) {
    return res.status(400).json({
      status: 400,
      message: "Please fill out the search field.",
    });
  }

  try {
    const data = {
      search: search,
    };
    const user = await findUserListService(data);
    if (user.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "User search successful.",
        data: user,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "No User Found.",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
};

export const statusUserChangeController = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }

  try {
    const data = {
      id: id,
      status: isActive,
    };

    const findUser = await findOneUserService(data);
    if (findUser.role !== "Admin") {
      const statusChange = await statusChangeService(data);
      if (statusChange) {
        if (statusChange.isActive) {
          return res.status(200).json({
            status: 200,
            message: "Active User Successfully.",
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "Deactive User Successfully.",
          });
        }
      }
    }else{
      return res.status(400).json({
        status:400,
        message:"You cannot change admin role ."
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
};
