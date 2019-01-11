const User = require('./user')
const Item = require('./item')
const LineItem = require('./line-item')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Order.belongsTo(User);
User.hasMany(Order);

LineItem.belongsTo(Order);
Order.hasMany(LineItem);

LineItem.belongsTo(Item);
Item.hasMany(LineItem); // this one is confusing, but it is necessary because an item can be defined multiple times in the line_items table.

//Prototype method to get the total of an order

Order.prototype.getTotal = async function(){
  const lineItems = await LineItem.findAll({
    where: {
      orderId: this.id
    }
  })
  const total = lineItems.reduce((accum, currVal) => {
    return accum + currVal.item.price  
  }, 0)
  return total
}

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Item,
  LineItem,
  Order
}
