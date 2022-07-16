const expressAsyncHandler = require('express-async-handler');
const ShoppingItem = require('../models/shoppingItems');
require('dotenv').config() 


//create award

const createShoppingItemCtrl= expressAsyncHandler(async (req, res) => {
    
    // const user= req?.user?._id
    const {name,  units, price}=req?.body
    try {
        const shoppingItem= await ShoppingItem.create({name,  units, price})
   
        res.json({shoppingItem})
    } catch (error) {
        console.log(error)
        res.json({error}) 
    }
});

// fetch all shoppingItems

const fetchAllShoppingItem= expressAsyncHandler(async (req, res) => {
    try {
        const shoppingItems= await ShoppingItem.find({})
        // shopping stats
      const shoppingStats= await ShoppingItem.aggregate(
        [
          // First Stage grouping
          {
            $group :
              {
                _id : "$status",
                totalShoppingAmount: { $sum: { $multiply: [ "$price", "$units" ] } }
              }
           },
           // Second Stage filtering
           {
             $match: { "totalShoppingAmount": { $gte: 0 } }
           }
         ]
       )
      
        res.json({shoppingItems, shoppingStats})
    } catch (error) {
        console.log(error)
        res.json({error}) 
    }
});


// fetch all awards of a given user 
// fetch all shoppingItem

const fetchUserShoppingItem= expressAsyncHandler(async (req, res) => {
    const id= req?.user?._id

    try {
        const shoppingItem=await ShoppingItem.find({id})
        res.json({shoppingItem})
    } catch (error) {
        res.json({error}) 
    }
});



// fetch one shoppingItem

const fetchOneShoppingItemCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params

    try {
        const shoppingItem= await ShoppingItem.findById(id)
        res.json({shoppingItem})
    } catch (error) {
        res.json({error}) 
    }
});

//updates shoppingItem

const updateShoppingItemctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    
    const {name,price, units, status}=req?.body
        try {
        const shoppingItem = await ShoppingItem.findByIdAndUpdate(id, {name,price, units, status}, { new: true })

        res.json({shoppingItem})
        
    } catch (error) {

        res.json(error)
    }
});


//delete shoppingItem

const deleteShoppingItemctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params
    try {
        const shoppingItem = await ShoppingItem.findByIdAndDelete (id)
      
        res.json({shoppingItem})
    } catch (error) {

        res.json(error)
    }
});



module.exports ={fetchUserShoppingItem, createShoppingItemCtrl, fetchOneShoppingItemCtrl, fetchAllShoppingItem, updateShoppingItemctrl, deleteShoppingItemctrl}