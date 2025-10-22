import mongoose from "mongoose";
import { deleteAdvertisingService, findAllAdvertisingService, findOneAdvertisingService, postAdvertisingService, updateOneAdvertisingService } from "../services/advertisingService.js";

export const getAllAdvertisingController = async (req, res) => {
  try {
    const data = await findAllAdvertisingService();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Advertising Successfully.",
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

export const postAdvertisingController = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const data = {
        title:title
    };

    const findAdvertising = await findAllAdvertisingService()
    if(findAdvertising.totalItems >= 4){
        return res.status(400).json({
            status:400,
            message:"Limit is full."
        })
    } else{
        const advertising = await postAdvertisingService(data);
      if (advertising) {
        return res.status(201).json({
          status: 201,
          message: "Create Advertising Successfully.",
          data: advertising,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const getOneAdvertisingController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }

  try {
    const data = {
      id: id,
    };
    const findCategory = await findOneAdvertisingService(data.id);
    if (findCategory) {
      return res.status(200).json({
        status: 200,
        message: "Fetch One Advertising Successfully.",
        data: findCategory,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Not Found Advertising",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const updateAdvertisingController = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }

  try {
    const data = {
      id: id,
      title:title
    };
    const updateAdvertising = await updateOneAdvertisingService(data);
      return res.status(200).json({
        status: 200,
        message: "Update Advertising Successfully.",
        data: updateAdvertising,
      });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const deleteAdvertisingController = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }

  try {
    const data = {
      id: id,
    };
    const deleteAdvertising = await deleteAdvertisingService(data);
    if (deleteAdvertising) {
      return res.status(200).json({
        status: 200,
        message: "Delete Advertising Successfully.",
      });
    } else {
      return res.status(500).json({
        status: 500,
        message: "Something Went wrong.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};