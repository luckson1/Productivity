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
      required: false,
    },
    
    amount: {
      type: Number,
      default: 0,
    },

status: {
    type: String,
    default: "Not Bought"
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

//calculate days left based on start date and end date
shoppingItemSchema.virtual("totalItemCost").get(function () {
  
    const price = this.price
    const amount= this.amount;;
    const totalItemCost =price*amount
    //convirt to nearest integer
    return Math.round(totalItemCost);
  });

//model
const ShoppingItem = mongoose.model("ShoppingItem", shoppingItemSchema);
module.exports = ShoppingItem;