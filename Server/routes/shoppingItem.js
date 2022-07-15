const express= require('express')
const  {fetchUserShoppingItem, createShoppingItemCtrl, fetchOneShoppingItemCtrl, fetchAllShoppingItem, updateShoppingItemctrl, deleteShoppingItemctrl}  = require('../controllers/shoppingItems');
shoppingItemRoutes=express.Router()

fetchAllShoppingItem
shoppingItemRoutes.post("/",  createShoppingItemCtrl);
shoppingItemRoutes.get("/",  fetchAllShoppingItem)
shoppingItemRoutes.get("/:id",  fetchOneShoppingItemCtrl)
shoppingItemRoutes.put("/:id",  updateShoppingItemctrl)
shoppingItemRoutes.delete("/:id",  deleteShoppingItemctrl)
module.exports={shoppingItemRoutes}