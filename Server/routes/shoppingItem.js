const express= require('express')
const  {fetchUserShoppingItem, createShoppingItemCtrl, fetchOneShoppingItemCtrl, fetchAllShoppingItem, updateShoppingItemctrl, deleteShoppingItemctrl}  = require('../controllers/shoppingItems');
const authentication = require('../middlewear/authentication');
shoppingItemRoutes=express.Router()


shoppingItemRoutes.post("/", authentication, createShoppingItemCtrl);
shoppingItemRoutes.get("/", authentication, fetchUserShoppingItem)
shoppingItemRoutes.get("/:id", authentication, fetchOneShoppingItemCtrl)
shoppingItemRoutes.put("/:id", authentication, updateShoppingItemctrl)
shoppingItemRoutes.delete("/:id", authentication, deleteShoppingItemctrl)
module.exports={shoppingItemRoutes}