const Category = require("../models/category");

const getCategories = async (req, res) => {
    const {page, limit} = req.query;
    const query = {state: true}
    try {
        const [categories, totalCategories] = await Promise.all([
            Category
                .find(query)
                .skip(page)
                .limit(limit)
                .populate('user', 'name'),
            Category.countDocuments(query)
        ])

        res.status(200).json({
            msg: 'success',
            totalCategories,
            categories
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            msg: 'Something was wrong'
        })
    }
}

const getCategory = async (req, res) => {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user');

    try {
        res.status(200).json({
            msg: 'success',
            category
        })
    } catch (e) {
        console.log(e)
        res.status(200).json({
            msg: 'Something was wrong'
        })
    }
}

const createCategory = async (req, res) => {
    const {name} = req.body;
    const categoryDb = await Category.findOne({name: name.toUpperCase()});

    if (categoryDb) {
        return res.status(400).json({
            msg: 'This category is already defined'
        })
    }


    const category = new Category({
        name: name.toUpperCase(),
        user: req.user.id
    })
    try {
        await category.save();
        res.status(201).json({
            msg: 'Category created successfully',
            category
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            msg: 'Something was wrong'
        })
    }
}

const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    try {
        const category = await Category.findByIdAndUpdate(id, {name: name.toUpperCase()}, {new: true})
        res.status(400).json({
            msg: 'Category update successfully',
            category
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            msg: 'Something was wrong'
        })
    }

}

const deleteCategory = async (req, res) => {
    const {id} = req.params;

    try {
        const category  = await Category.findByIdAndUpdate(id,{state: false});
        res.status(200).json({
            msg: `The category ${category.name} was deleted`
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            msg: 'Something was wrong'
        })
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}