import {
  getOrdersByUserService,
  createPaymentIntentService,
  getOrderById, 
  updateOrderPaymentMethod, 
  updateOrder,
  updateStatusOrder
} from "@/api.services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createPaymentIntent = createAsyncThunk(
  "orders/createPaymentIntent",
  async (data, { rejectWithValue }) => {
    try {
      return await createPaymentIntentService(data);
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const updateOrderById = createAsyncThunk (
  "orders/updateOrderById",
  async ({ orderId, updatedOrderItems }, { rejectWithValue }) => {
    try {
      console.log("data iin order UPDATE", orderId)
      console.log("data iin order UPDATE", updatedOrderItems)
      const data =  await updateOrder(orderId, updatedOrderItems);
      console.log("data iin order UPDATE", data)
      return data;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, updateData }, { rejectWithValue }) => {
    try {
      console.log("data iin order Status UPDATE", orderId)
      console.log("data iin order Status UPDATE", updateData)
      const data = await updateStatusOrder(orderId, updateData);
      return data;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchOrderById = createAsyncThunk (
  "orders/fetchOrderId",
  async (orderId, { rejectWithValue }) => {
    try {
      const data =  await getOrderById(orderId);
      console.log("data iin order", data)
      return data;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);


export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersByUserService();
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const updateOrderWithPayment = createAsyncThunk(
  "orders/updateOrderPaymentMethod",
  async ({paymentMethodId, orderId}, { rejectWithValue }) => {
    try {
      return await updateOrderPaymentMethod(paymentMethodId, orderId);
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order:null,
    isLoading: false,
    error: "",
    message: "",
    price: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
        state.orders = [];
      })

      .addCase(updateOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.orders = action.payload;
      })
      .addCase(updateOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
        state.orders = [];
      })

      .addCase(updateOrderWithPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderWithPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.order = action.payload;
      })
      .addCase(updateOrderWithPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
        state.order = null;
      })

      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
        state.order = null;
      })
      //
      .addCase(createPaymentIntent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentIntent.fulfilled, (state) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
      });
  },
});

export default orderSlice.reducer;
