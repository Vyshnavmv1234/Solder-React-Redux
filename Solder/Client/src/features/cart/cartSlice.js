import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = ()=>{

  const cart = localStorage.getItem('cart')

  return cart? JSON.parse(cart):[]
}
const setCartToLocalStorage = (cartItems)=>{
  localStorage.setItem('cart',JSON.stringify(cartItems))
}

const initialState = {
  cartItems: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const stock = product.stock ?? product.quantity;

      const exists = state.cartItems.find((item) => item._id === product._id);

      if (exists) {
        const currentStock = exists.stock ?? stock ?? Infinity;
        if (exists.quantity < currentStock) {
          exists.quantity += 1;
        }
      } else {
        if (stock === undefined || stock > 0) {
          state.cartItems.push({
            ...product,
            stock: stock,
            quantity: 1,
          });
        }
      }
      setCartToLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== productId,
      );
      setCartToLocalStorage(state.cartItems);
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.cartItems.find((item) => item._id === productId);

      if (item) {
        const maxStock = item.stock ?? Infinity;
        if (item.quantity < maxStock) {
          item.quantity += 1;
        }
      }
      setCartToLocalStorage(state.cartItems);
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.cartItems.find((item) => item._id === productId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      setCartToLocalStorage(state.cartItems);
    },
    clearCart:(state)=>{
      state.cartItems = []
      setCartToLocalStorage(state.cartItems);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer
