const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//schema
const shoppingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId, 
      ref: "User",
      required: true,
    },
    
    units: {
      type: Number,
      default: 1,
    },

status: {
    type: String,
    default: "On Shopping List"
},
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//populate virtuals

//calculate total amount of an item
shoppingItemSchema.virtual("totalItemCost").get(function () {
  
    const price = this.price
    const units= this.units;
    const totalItemCost =price*units
    //convert to nearest integer
    return totalItemCost
  });

//model
const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);
module.exports = ShoppingItem;