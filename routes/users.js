const router = require('express').Router();

router.get("/usertest", (req,res)=>{
    res.send("User tested")
})

module.exports = router;