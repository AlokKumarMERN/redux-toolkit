import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from "../../cartitems";

const url = "https://www.course-api.com/react-useReducer-cart-project";
const initialState = {
    cartItems: [],
        amount: 4,
        total: 0,
        isLoading: true,
};
export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const resp = await axios(url);
    return  resp.data;
  } catch(err) {
    return console.log(err)
  }
})

const cartSlice = createSlice({
    name: "cart",
   initialState,
   reducers: {
    clearCart: function (state){
        state.cartItems = [];
    },
    removeItem: function (state, action){
        // console.log(action.payload);
        const itemId = action.payload;
        // update cartItems such no object with above id is present in new cartitems
        state.cartItems = state.cartItems.filter(item => item.id != itemId )
      },
      increase: function(state, action){
        // console.log(action);
        const itemId = action.payload;
        const cartItem = state.cartItems.find((item) => item.id === itemId)
        cartItem.amount = cartItem.amount + 1;
        // console.log(itemId);
      },
      decrease: function(state, action){
        
        const itemId = action.payload;
        const cartItem = state.cartItems.find((item) => item.id === itemId)
        cartItem.amount = cartItem.amount - 1;

      },
      calculateTotal: function(state){
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          if (!state.cartItems) {
            console.error("cartItems is undefined");
            return;
          }
          amount+= item.amount;
          total += item.amount * item.price;
          console.log(total);
        });
        state.amount = amount;
        state.total = total;
      }
   },
   extraReducers: (builder) => {
    builder
    .addCase(getCartItems.pending, function(state) {
      state.isLoading = true;

    })
    .addCase(getCartItems.fulfilled, function(state, action) {
      console.log("Cart Slice line-60: ", action);
      state.isLoading = false;
      state.cartItems = action.payload;
    })
    .addCase(getCartItems.rejected, function(state, action){
      state.isLoading = false;
      console.log(action);
    })
   }
   
});
// console.log(cartSlice );

export const {clearCart, removeItem, increase, decrease, calculateTotal}= cartSlice.actions
// console.log(cartSlice);
export default cartSlice.reducer;