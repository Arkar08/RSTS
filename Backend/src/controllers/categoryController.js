import mongoose from "mongoose";
import {
  deleteCategoryService,
  dropdownCategoryService,
  findAllCategoryListService,
  findAllCategoryService,
  findCategoryListService,
  findCategoryNameService,
  findOneCategoryService,
  paginateCategoryService,
  postCategoryService,
  updateOneCategoryService,
} from "../services/categoryService.js";
import { findProductCategoryService } from "../services/productService.js";

export const postCategoryController = async (req, res) => {
  const { image, name } = req.body;

  if (!name || !image) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const data = {
      name: name,
      image: image,
    };
    const findName = await findCategoryNameService(data);
    if (findName) {
      return res.status(400).json({
        status: 400,
        message: "Category Name is already exist.",
      });
    } else {
      const category = await postCategoryService(data);
      if (category) {
        return res.status(201).json({
          status: 201,
          message: "Create Category Successfully.",
          data: category,
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

export const getAllCategoryController = async (req, res) => {
  try {
    const data = await findAllCategoryService();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Category Successfully.",
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

export const getAllCategoryListController = async (req, res) => {
  try {
    const data = await findAllCategoryListService();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Category Successfully.",
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

export const getOneCategoryController = async (req, res) => {
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
    const findCategory = await findOneCategoryService(data.id);
    if (findCategory) {
      return res.status(200).json({
        status: 200,
        message: "Fetch One Category Successfully.",
        data: findCategory,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Not Found Category",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  const { id } = req.params;
  const { name, image } = req.body;

  if (!name || !image) {
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
      name: name,
      image: image,
    };
    const findCategoryName = await findCategoryNameService(data);
    if (findCategoryName) {
      if (findCategoryName._id.toString() === id) {
        const updateCategory = await updateOneCategoryService(data);
        return res.status(200).json({
          status: 200,
          message: "Update Category Successfully.",
          data: updateCategory,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Category Name is already exist.",
        });
      }
    } else {
      const updateCategory = await updateOneCategoryService(data);
      return res.status(200).json({
        status: 200,
        message: "Update Category Successfully.",
        data: updateCategory,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
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
    const deleteCategory = await deleteCategoryService(data);
    if (deleteCategory) {
      return res.status(200).json({
        status: 200,
        message: "Delete Category Successfully.",
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

export const paginateCategoryController = async (req, res) => {
  const { page } = req.body;

  if (!page) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const category = await paginateCategoryService(page, 10);
    if (category) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Category Successfully.",
        data: category,
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

export const searchCategoryController = async (req, res) => {
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
    const category = await findCategoryListService(data);
    if (category.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Category search successful.",
        data: category,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "No Category Found.",
        data: category,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
};

export const dropdownCategoryController = async(req,res) => {
  try {
    const category = await dropdownCategoryService()
    if(category){
      return res.status(200).json({
        status:200,
        message:"Dropdown Category Successfully.",
        data:category
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
}

export const postCategoryProductController = async(req,res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }

  try {
    const data = {
      category:id
    }
    const findProduct = await findProductCategoryService(data)
    if(findProduct){
      return res.status(200).json({
        status:200,
        message:"Product Category Successfully.",
        data:findProduct
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
}