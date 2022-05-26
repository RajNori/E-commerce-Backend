const router = require('express').Router();
// const { where } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tagsData = await Tag.findAll({
            include: [{
                model: Product,
                through: ProductTag,
                attributes: ['id', 'product_name', 'price', 'stock']
            }]
        })
        res.status(200).json(tagsData)
    } catch (error) {
        res.send(500).json(error)
    }

});

router.get('/:id', async(req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tagsData = await Tag.findByPk(req.params.id, {
            include: [{
                model: Product,
                through: ProductTag,
                attributes: ['id', 'product_name', 'price', 'stock']
            }]
        })
        res.status(200).json(tagsData)
    } catch (error) {
        res.send(500).json(error)
    }

});

router.post('/', async(req, res) => {
    // create a new tag
    try {
        const tagsData = await Tag.create(req.body);
        res.status(200).json(tagsData)
    } catch (error) {
        res.send(400).json(error)
    }
});

router.put('/:id', async(req, res) => {
    // update a tag's name by its `id` value
    try {
        const tagsData = await Tag.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!tagsData) {
            res.status(404).json({ message: 'No category with the specified ID... please enter a valid category ID!' })
            return;
        }
        res.status(200).json(tagsData)
    } catch (error) {
        res.status(500).json(error)

    }
});

router.delete('/:id', async(req, res) => {
    // delete on tag by its `id` value
    try {
        const tagsData = await Tag.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!tagsData) {
            res.status(404).json({
                message: 'No category with the specified ID... please enter a valid category ID!'
            })
            return;
        }
        res.status(200).json(tagsData)
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;