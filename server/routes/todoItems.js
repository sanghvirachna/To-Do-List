const router = require('express').Router()
const todoItemModel = require('../models/todoItems')

router.post('/api/item',async (req,res) => {
    const newItem = new todoItemModel({
        item : req.body.item,
   })
   const saveItem = await newItem.save()
   res.status(200).json(saveItem)
})
router.get('/api/item', async(req,res) => {
    const items = await todoItemModel.find({})
    res.status(200).json(items)
})

router.put('/api/item/:id',async (req,res) => {
    const updateItem = await todoItemModel.findByIdAndUpdate(req.params.id,{$set:req.body})
    res.status(200).json(updateItem)
    
})
router.delete('/api/item/:id',async(req,res) => {
    const deleteItem = await todoItemModel.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteItem)
})
module.exports = router