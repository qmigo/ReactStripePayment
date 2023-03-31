import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        incItemQty: (state, action) => {
            state.cart.forEach((item, index)=>{
                if(item.id===action.payload)
                {
                    state.cart[index].qty ++
                }
            })
        },
        decItemQty: (state, action) => {
            state.cart.forEach((item, index)=>{
                
                if(item.id===action.payload)
                {
                    if(item.qty===1 )
                    {
                        state.cart.splice(index,1)
                    }
                    else
                    state.cart[index].qty --
                }
            })
        },
    }
})

export const { addToCart, incItemQty, decItemQty } = cartSlice.actions

export default cartSlice.reducer