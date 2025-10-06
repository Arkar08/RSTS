import Category from "../models/categorySchema.js";
import Products from "../models/productSchema.js";

export const findProductNameService = async (data) => {
  const findProductName = await Products.findOne({ name: data.name });
  return findProductName;
};

export const createProductService = async (data) => {
  const newProduct = await Products.create({
    name: data.name,
    category: data.category,
    quantity: data.quantity,
    price: data.price,
    productFeature: data.productFeature,
    images: data.images,
    customerSalePrice:data.customerSalePrice,
    isShippingRequired:data.isShippingRequired
  });
  return newProduct;
};

export const findAllProductService = async () => {
  const sortBy = { updatedAt: -1 };
  const getProduct = await Products.find({}).skip(0).limit(10).sort(sortBy);
  const getCategory = getProduct.map((product) => product.category);
  const findCategory = await Category.find({ _id: getCategory });

  const categoryObject = {};
  findCategory.forEach((category) => {
    return (categoryObject[category._id] = category.name);
  });

  const product = getProduct.map((product) => {
    const category = categoryObject[product.category] || "Unknown";

    return { ...product.toObject(), category: category };
  });

  const total = await Products.countDocuments();
  return {
    data: product,
    currentPage: 1,
    totalPages: Math.ceil(total / 10),
    totalItems: total,
  };
};

export const paginatieProductService = async (page, limit) => {
  const skip = (page - 1) * limit;
  const sortBy = {updatedAt: - 1}

  const getProduct = await Products.find({}).skip(skip).limit(limit).sort(sortBy);
  const getCategory = getProduct.map((product) => product.category);
  const findCategory = await Category.find({ _id: getCategory });

  const categoryObject = {};
  findCategory.forEach((category) => {
    return (categoryObject[category._id] = category.name);
  });

  const product = getProduct.map((product) => {
    const category = categoryObject[product.category] || "Unknown";

    return { ...product.toObject(), category: category };
  });

  const total = await Products.countDocuments();
  return {
    data: product,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };
};

export const findOneProductService = async (data) => {
  const findProduct = await Products.findById({ _id: data });
  const findCategory = await Category.findById({_id:findProduct.category})
  
  let list;
  if(findCategory){
    list = {...findProduct.toObject(),categoryName:findCategory.name}
  }else{
    list = findProduct;
  }
  const relatedProduct = await Products.find({
      category: findProduct.category,
      _id: { $ne: findProduct._id },
    });
    return {
      data:list,
      relatedProduct:relatedProduct
    }
};

export const findOneProductOrderService = async(data)=>{
  const findProduct = await Products.findById({_id:data})
  return findProduct
}

export const updateOneProductService = async (data) => {
  const updateProduct = await Products.findOneAndUpdate(
    { _id: data.id },
    {
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      price: data.price,
      productFeature: data.productFeature,
      images: data.images,
      customerSalePrice:data.customerSalePrice,
      isShippingRequired:data.isShippingRequired
    },
    { new: true, runValidators: true }
  );
  return updateProduct;
};

export const deleteProductService = async (data) => {
  const deleteProduct = await Products.findOneAndDelete({ _id: data.id });
  return deleteProduct;
};

export const findProductListService = async (data) => {
  const products = await Products.find({});
  const getCategory = products.map((product) => product.category);
  const findCategory = await Category.find({ _id: getCategory });

  const categoryObject = {};
  findCategory.forEach((category) => {
    return (categoryObject[category._id] = category.name);
  });

  const product = products.map((product) => {
    const category = categoryObject[product.category] || "Unknown";

    return { ...product.toObject(), category: category };
  });

  const list = product.filter(
    (listing) =>
      listing.name?.toLowerCase().includes(data.search.toLowerCase()) ||
      listing.category?.toLowerCase().includes(data.search.toLowerCase())
  );

  return list;
};

export const findProductCategoryService = async(data)=>{
  const categoryName = await Category.findById({_id:data.category})
  const products = await Products.find({category:data.category})
  const getCategory = products.map((product) => product.category);
  const findCategory = await Category.find({ _id: getCategory });

  const categoryObject = {};
  findCategory.forEach((category) => {
    return (categoryObject[category._id] = category.name);
  });

  const product = products.map((product) => {
    const category = categoryObject[product.category] || "Unknown";

    return { ...product.toObject(), category: category };
  });
  return {
    data:product,
    categoryName:categoryName.name
  }
}

export const getAllProductService = async()=>{
  const products = await Products.find({})
  return products;
}