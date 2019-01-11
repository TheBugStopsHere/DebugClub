//UTILITY FUNCTIONS

const utils = {};

//this function adds decimals and the appropriate zeros to the price. 
utils.addDecimal = (price) => {
    let value = price/100;
    // Split the input string into two arrays containing integers/decimals
    const cost = value.toString().split(".");
    
    // If there is no decimal point or only one decimal place found.
    if(cost.length == 1 || cost[1].length < 3) { 
        // Set the number to two decimal places
        value = value.toFixed(2);
    }
    // Return updated or original number.
    return value;
}
//prototype method not working, so here is a utility function to get the total of prices off an array of items objects
utils.getTotal = (items) => {
  const total = items.reduce((accum, currVal) => {
    return accum + currVal.item.price  
  }, 0)
  return total
}

module.exports = utils;
