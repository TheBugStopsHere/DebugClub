import { createCart } from 'react-redux-shopping-cart';
import store from '../store'
 
const cart = createCart(store);
 
const item = {
  id: 'foo',
  price: 1,
  qty: 1
};
 
cart.setCart({items: [item]});