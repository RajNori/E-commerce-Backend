const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async(req, res) => {
    try {
        const categoriesData = await Category.findAll();
        res.status(200).json(categoriesData);
    } catch (error) {
        res.status(500).json(error)
    }

});

// find one category by its `id` value
router.get('/:id', async(req, res) => {
    try {
        const categoryById = await Category.findByPk(req.params.id, {
            include: [{ model: Product, attributes: ['product_name', 'price', 'stock'], }]
        })
        if (!categoriesData) {
            res.status(404).json({ messge: 'No category with the specified ID... please enter a valid category ID!' })
            return;
        }
        res.status(200).jsaon(categoriesData);

    } catch (error) {
        res.status(500).json(error)
    }

});

// create a new category
router.post('/', async(req, res) => {
    try {
        const categories = await Category.create(req.body);
        res.status(200).json(categoriesData);
    } catch (error) {
        res.status(400).json(error)
    }
});

// update a category by its `id` value
router.put('/:id', async(req, res) => {
    try {
        const categoriesData = await Category.update(req.body, {
            where: { id: req.params.id }
        });
        if (!categoriesData) {
            req.status(404).json({ messaga: 'No category with the specified ID... please enter a valid category ID!' })
            return;
        }
        res.status(200).json(categoriesData);

    } catch (error) {
        res.status(500).json(error)
    }

});

// delete a category by its `id` value
router.delete('/:id', async(req, res) => {
    try {
        const categoriesData = await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!categoriesData) {
            req.status(404).json({ messaga: 'No category with the specified ID... please enter a valid category ID!' })
            return;
        }
        res.status(200).json(categoriesData)

    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;