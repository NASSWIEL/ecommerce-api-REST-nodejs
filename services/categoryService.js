const categoryModel = require('../models/categoryModel');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler');


// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1; //to tern into string or get back to intial page
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
  
    const categories = await categoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length, page, data: categories });
  });

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(200).json({ data: category });
  });

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory =  asyncHandler(async (req,res) => {
    const name = req.body.name;
    const category = await categoryModel.create({name,slug : slugify(name)});
    res.status(201).json({data : category})

});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    const category = await categoryModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    );
  
    if (!category) {
      res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(200).json({ data: category });
  });


  // @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);

  if (!category) {
    res.status(404).json({ msg: `No category for this id ${id}` });
  }
  res.status(204).send();
});
