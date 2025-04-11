import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  cart: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem: {
      prepare(id, name, unitPrice) {
        return {payload: {pizzaId: id, name, unitPrice, quantity: 1, totalPrice: unitPrice}};
      },
      reducer(state, action) {
        state.cart.push(action.payload);
      }
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // const item = state.cart.filter(item => item.pizzaId === action.payload).at(0);
      const item = state.cart.find(item => item.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find(item => item.pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice = item.totalPrice - item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    }
  }
})

export const {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalCount = (store) => store.cart.cart.reduce((acc, item) => acc += item.quantity, 0);
export const getTotalPrice = (store) => store.cart.cart.reduce((acc, item) => acc += item.totalPrice, 0);
export const getCart = (store) => store.cart.cart;
export const getCurrentQuantityById = (id) => (store) => store.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
