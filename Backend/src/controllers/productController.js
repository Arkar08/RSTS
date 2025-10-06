import mongoose from "mongoose";
import { findOneCategoryService } from "../services/categoryService.js";
import {
  createProductService,
  deleteProductService,
  findAllProductService,
  findOneProductService,
  findProductListService,
  findProductNameService,
  getAllProductService,
  paginatieProductService,
  updateOneProductService,
} from "../services/productService.js";

export const postProductController = async (req, res) => {
  const { name, category, quantity, price, productFeature, images,customerSalePrice ,isShippingRequired} = req.body;

  if (!name || !category || !quantity || !price) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const data = {
      name: name,
      category: category,
      quantity: quantity,
      price: price,
      productFeature: productFeature,
      images: images,
      customerSalePrice:customerSalePrice,
      isShippingRequired:isShippingRequired
    };

    if(customerSalePrice >= price){
      return res.status(400).json({
        status:400,
        message:"Discount Price should be less than main Price."
      })
    }

    const findProductName = await findProductNameService(data);

    if (findProductName) {
      return res.status(400).json({
        status: 400,
        message: "Product is already exist.",
      });
    }

    const findCategory = await findOneCategoryService(data.category);

    if (!findCategory) {
      return res.status(404).json({
        status: 404,
        message: "Category does not exist.",
      });
    }

    const newProduct = await createProductService(data);

    if (newProduct) {
      const category = await findOneCategoryService(newProduct.category);
      const product = { ...newProduct.toObject(), category: category.name };

      return res.status(201).json({
        status: 201,
        message: "Create Product Successfully.",
        data: product,
      });
    } else {
      return res.status(500).json({
        status: 500,
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

export const getAllProductController = async (req, res) => {
  try {
    const data = await findAllProductService();
    if (data) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Products Successfully.",
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

export const getOneProductController = async (req, res) => {
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
    const findProduct = await findOneProductService(data.id);
    if (findProduct) {
      return res.status(200).json({
        status: 200,
        message: "Fetch One Product Successfully.",
        data: findProduct,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Not Found Product",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const updateProductController = async (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price, productFeature, images,customerSalePrice,isShippingRequired } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 400,
      message: "Invalid Id",
    });
  }

  if (!name || !category || !quantity || !price) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const data = {
      id: id,
      name: name,
      category: category,
      quantity: quantity,
      price: price,
      productFeature: productFeature,
      images: images,
      customerSalePrice:customerSalePrice,
      isShippingRequired:isShippingRequired
    };

    if(customerSalePrice >= price){
      return res.status(400).json({
        status:400,
        message:" Discount Price should be less than main Price."
      })
    }


    const findCategory = await findOneCategoryService(data.category);

    if (!findCategory) {
      return res.status(404).json({
        status: 404,
        message: "Category does not exist.",
      });
    }

    const findProductName = await findProductNameService(data);

    if (findProductName) {
      if (findProductName._id.toString() === id) {
        const updateProduct = await updateOneProductService(data);
        return res.status(200).json({
          status: 200,
          message: "Update Product Successfully.",
          data: updateProduct,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Product Name is already exist.",
        });
      }
    } else {
      const updateProduct = await updateOneProductService(data);
      return res.status(200).json({
        status: 200,
        message: "Update Product Successfully.",
        data: updateProduct,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something Went Wrong.",
    });
  }
};

export const deleteProductController = async (req, res) => {
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

    const deleteProduct = await deleteProductService(data);

    if (deleteProduct) {
      return res.status(200).json({
        status: 200,
        message: "Delete Product Successfully.",
      });
    } else {
      return res.status(500).json({
        status: 500,
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

export const paginateProductController = async (req, res) => {
  const { page } = req.body;

  if (!page) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }

  try {
    const product = await paginatieProductService(page, 10);
    if (product) {
      return res.status(200).json({
        status: 200,
        message: "Fetch Products Successfully.",
        data: product,
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

export const searchProductController = async (req, res) => {
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
    const products = await findProductListService(data);
    if (products.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Product search successful.",
        data: products,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "No Product Found.",
        data: products,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
};


export const getAllProductListingController = async(req,res) => {
  try {
    const findAllProduct = await getAllProductService()
    return res.status(200).json({
      status:200,
      message:"Fetch All Product Successfully.",
      data:findAllProduct
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Something went wrong.",
    });
  }
}