const User = require('../models/User');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

const router = require('express').Router();

//get user
router.get('/find/:id',verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//get All users[only by an admin]
router.get('/',verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new;
    try{
        const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find().limit();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
})

//update user
router.put('/:id',verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
        req.body.password =  CryptoJS.AES.encrypt(req.body.password, process.env.PWD_SECRET).toString();
    }
    try{
        const updateUser = await User.findByIdAndUpdate(req.user.id,{
            $set: req.body
        },{new:true});
        const {password, ...others} = updateUser._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err);
    }
})

//delete user
router.delete('/:id',verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const deletedUser = await User.findByIdAndRemove(req.user.id);
        const {password, ...others} = deletedUser._doc;
        res.status(200).json({"msg": "User has been deleted",...others})
    }catch(err){
        res.status(500).json(err);
    }
})

//Get user stats where how many users signed up in each month of the current year
router.get("/stats", verifyTokenAndAdmin , async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data = await User.aggregate([
            {$match:{createdAt:{$gte: lastYear}}},
            {
                $project:{
                    month:{$month: "$createdAt"},
                }
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;