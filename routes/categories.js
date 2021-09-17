const router = require("express").Router();
const Category = require("../models/Categories");


//create
router.post("/", async (req, res) => {
    const newCat = new Category(req.body);
    try{
        const savedCat = await newCat.save()
        res.status(200).json(savedCat);
    }catch(err){
        res.status(500).json(err)
    }
})

//get all categories
router.get("/", async (req, res) => {
    
    try{
        const cats = await Category.find()
        res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err)
    }
})

//delete category
router.delete('/:id', async (req, res) => {
    try{
        const categ = await Category.findById(req.params.id);
       
            if(categ.username === req.body.username){
                try{
                   await categ.delete()
                    res.status(200).json("category deleted !");
                }catch(err){
                    res.status(500).json(err)
                }
            }
            else{
                res.status(401).json("you can delete only your category!")
            }
        }catch(err){
        res.status(500).json(err)
    }
});




module.exports = router;