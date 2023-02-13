const Product = require('../models/Product');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

const router = require('express').Router();

// Create Product
router.post('/',verifyTokenAndAdmin ,async(req,res)=>{
    const product = new Product(req.body);
    try{
        const savedProduct = await product.save();
        res.status(200).json(savedProduct._doc);
    }catch(err){
        res.status(500).json(err)
    }
    
})
//get product
router.get('/find/:id', async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
})

//get All products
router.get('/', async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.Category;
    try{
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(1);
        }else if(qCategory){
            products = await Product.find({
                categories:{
                $in:[qCategory]
            }
        })
        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
})

//update product
router.put('/:id',verifyTokenAndAdmin, async(req,res)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).json(updatedProduct._doc)
    }catch(err){
        res.status(500).json(err);
    }
})

//delete product
router.delete('/:id',verifyTokenAndAdmin, async(req,res)=>{
    try{
        const deletedProduct = await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({"msg": "Product has been deleted",deletedProduct})
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;