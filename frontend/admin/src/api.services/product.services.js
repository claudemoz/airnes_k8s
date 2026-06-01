import axios from "../configs/axios";

export const getProducts = async () => {
  const { data } = await axios.get("/product/get-products");
  return data;
};

export const createProduct = async (item) => {
  const { data } = await axios.post("/product/add-product", item);
  return data;
};

export const editProduct = async (item) => {
  const { data } = await axios.put(`/product/update-product/${item.productId}`, item.formData);
  return data;
};

export const removeProduct = async (productId) => {
  const { data } = await axios.delete(`/product/delete-product/${productId}`);
  return data;
};
export const removeMultipleProducts = async (item) => {
  const { data } = await axios.post(`/product/delete-many-products`, item);
  return data;
};


export const getSalesHistogram = async (params) => {
  const { period } = params; 
  const { data } = await axios.get('/product/get-sales-histogram', { params: { period } });
  return data;
};


export const getAverageBasketHistogram = async (params) => {
  const { period } = params; 
  const { data } = await axios.get('/product/get-average-basket-histogram', { params: { period } });
  return data;
};

export const getSalesByCategory = async (params) => {
  const { period } = params; 
  const { data } = await axios.get('/product/get-sales-by-category', { params: { period } });
  return data;
};


// export const getProductbyId = async (id) => {
//   try {
//     const { data } = await axios.get("/product/get-products");
//     return data;
//   } catch (error) {
//     throw new Error("Problème de récupération des données");
//   }
// };
