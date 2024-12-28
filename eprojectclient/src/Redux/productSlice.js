import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiProduct = "http://localhost:5281/api/Product";
//redux thunk(middleware) su ly bat dong bo
export const fetchProducts = createAsyncThunk("products/fetchProducts",async ()=>{
    try {
        const response = await axios.get(apiProduct);
        return response.data.data;
    } catch (error) {
        console.log("error: ",error);
        
    }
})
export const createProduct = createAsyncThunk("products/createProduct",async (product)=>{
    try {
        const response = await axios.post(apiProduct,product);
        console.log("response: ",response);
        return response.data.data;
    } catch (error) {
        console.log("error: ",error);
        
    }
})
export const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isUpdate: false,
    product: {name:"",price:"",quantity:"",status:false},
    status: "idle",
    error: null,
  },
  reducers: {
    //su ly dong bo
    handleSetProduct:(state,action)=>{
        console.log("action: ",action);
        state.product = action.payload
    }
  },
  extraReducers: (builder) => {
    //su ly bat dong bo
    builder
        .addCase(fetchProducts.fulfilled,(state,action)=>{            
            state.status = "succeeded"
            state.items = action.payload;
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            console.log("action: ",action);
            
            state.status = "succeeded"
            state.items.unshift(action.payload)
        });
  },
});
export const {handleSetProduct} = productSlice.actions;
export default productSlice.reducer;
