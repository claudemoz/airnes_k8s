/* eslint-disable no-unsafe-optional-chaining */
import { createProduct, getProducts, editProduct, removeProduct, removeMultipleProducts,getSalesHistogram, getAverageBasketHistogram, getSalesByCategory} from "@/api.services";
// import axios from "@/configs/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ########### Call API ########### //

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",

  async (product, { rejectWithValue }) => {
    try {
      return await createProduct(product);
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",

  async (item, { rejectWithValue }) => {
    try {
      return await editProduct(item);
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",

  async (productId, { rejectWithValue }) => {
    try {
      return await removeProduct(productId);
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);
export const deleteManyProducts = createAsyncThunk(
  "products/deleteManyProducts",

  async (item, { rejectWithValue }) => {
    try {
      return await removeMultipleProducts(item);
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const fetchSalesHistogram = createAsyncThunk(
  'products/fetchSalesHistogram',
  async (period, { rejectWithValue }) => {
    try {
      return await getSalesHistogram({ period });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);


export const fetchAverageBasketHistogram = createAsyncThunk(
  'products/fetchAverageBasketHistogram',
  async (period, { rejectWithValue }) => {
    try {
      return await getAverageBasketHistogram({ period });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);


export const fetchSalesByCategory = createAsyncThunk(
  'products/fetchSalesByCategory',
  async (period, { rejectWithValue }) => {
    try {
      return await getSalesByCategory({ period });
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

//#############  ############## //
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    message: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //## region récupération du produit
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.products = action.payload.map(product => ({...product, categories: product.categories.map(c => c._id) }));
        // console.log("state.products ", state.products);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
        state.products = [];
      })
      //## endregion récupération du produit

      //## region Ajout du produit
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload?.errorMessage;
      })
      //## endregion ajout du produit

      //## region mise à jour  du produit
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.products.splice(index, 1, action.payload);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload?.errorMessage;
      })
      //## endregion mise à jour  du produit

      //## region suppression du produit
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(c => c._id === action.payload.productId);
        if (index !== -1) state.products.splice(index, 1);
        state.message = action.payload?.message
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.errorMessage;
      })
    //## region suppression du produit

    //## region suppression de plusieurs produits
    .addCase(deleteManyProducts.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteManyProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      const idsList = action?.payload;
      const message = `${idsList.length} Produit${idsList.length > 1 ? 's' : ''} supprimé${idsList.length > 1 ? 's' : ''} avec succes`;
      state.message = message;
      state.products = state.products.filter(product => !idsList.includes(product._id));
    })
    .addCase(deleteManyProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.errorMessage;
    })
    //## region suppression du produit

    //## getSalesHistogram
    .addCase(fetchSalesHistogram.pending, (state) => {
      state.isLoadingSales = true;
    })
    .addCase(fetchSalesHistogram.fulfilled, (state, action) => {
      state.isLoadingSales = false;
      state.errorSales = '';
      state.salesData = action.payload;
    })
    .addCase(fetchSalesHistogram.rejected, (state, action) => {
      state.isLoadingSales = false;
      state.errorSales = action.payload?.errorMessage;
      state.salesData = [];
    })
    //##getSalesHistogram


      //## fetchAverageBasketHistogram
    .addCase(fetchAverageBasketHistogram.pending, (state) => {
      state.isLoadingAverageBasket = true;
    })
    .addCase(fetchAverageBasketHistogram.fulfilled, (state, action) => {
      state.isLoadingAverageBasket = false;
      state.errorAverageBasket = '';
      state.averageBasketData = action.payload;
    })
    .addCase(fetchAverageBasketHistogram.rejected, (state, action) => {
      state.isLoadingAverageBasket = false;
      state.errorAverageBasket = action.payload?.errorMessage;
      state.averageBasketData = [];
    })
    //##fetchAverageBasketHistogram


      //## fetchSalesByCategory
    .addCase(fetchSalesByCategory.pending, (state) => {
      state.isLoadingSalesByCategory = true;
    })
    .addCase(fetchSalesByCategory.fulfilled, (state, action) => {
      state.isLoadingSalesByCategory = false;
      state.errorSalesByCategory = '';
      state.SalesByCategoryData = action.payload;
    })
    .addCase(fetchSalesByCategory.rejected, (state, action) => {
      state.isLoadingSalesByCategory = false;
      state.errorSalesByCategory = action.payload?.errorMessage;
      state.SalesByCategoryData = [];
    });
    //##fetchSalesByCategory
  },
});

// export const {  } = userSlice.actions;
export default productSlice.reducer;
