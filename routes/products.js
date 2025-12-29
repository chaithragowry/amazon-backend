
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

//get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Error in fetching products', error);
        res.status(500).json({
            success: false,
            message: 'Error in fetching products'
        });
    }
});


//get single product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Error in fetching product', error);
    }
});


//get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.category
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error('Error in fetching category products', error);
        res.status(500).json({
            success: false,
            message: 'Error in fetching products'
        });
    }
});


module.exports = router;