import Category from "../models/categorySchema.js";

export const findCategoryNameService = async (data) => {
  const findName = await Category.findOne({ name: data.name });
  return findName;
};

export const postCategoryService = async (data) => {
  const postCategory = await Category.create({
    name: data.name,
    image: data.image,
  });
  return postCategory;
};

export const findAllCategoryService = async () => {
  const sortBy = { updatedAt: -1 };
  const getCategory = await Category.find({}).skip(0).limit(10).sort(sortBy);
  const total = await Category.countDocuments();
  return {
    data: getCategory,
    currentPage: 1,
    totalPages: Math.ceil(total / 10),
    totalItems: total,
  };
};

export const findAllCategoryListService = async () => {
  const getCategory = await Category.find({})
  return getCategory;
};

export const paginateCategoryService = async (page, limit) => {
  const skip = (page - 1) * limit;
  const sortBy = {updatedAt: - 1}

  const getCategory = await Category.find({}).skip(skip).limit(limit).sort(sortBy);
  const total = await Category.countDocuments();
  return {
    data: getCategory,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  };
};

export const findOneCategoryService = async (data) => {
  const findCategory = await Category.findById({ _id: data });
  return findCategory;
};

export const updateOneCategoryService = async (data) => {
  const updateCategory = await Category.findOneAndUpdate(
    { _id: data.id },
    { name: data.name, image: data.image },
    { new: true, runValidators: true }
  );
  return updateCategory;
};

export const deleteCategoryService = async (data) => {
  const deleteCategory = await Category.findOneAndDelete({ _id: data.id });
  return deleteCategory;
};

export const findCategoryListService = async (data) => {
  const category = await Category.find({});
  const list = category.filter((cat) =>
    cat.name?.toLowerCase().includes(data.search.toLowerCase())
  );
  return list;
};

export const dropdownCategoryService = async () => {
  const category = await Category.find({})
  return category;
}