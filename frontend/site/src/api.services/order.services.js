/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "../configs/axios";

export const checkout = async (orderItems) => {
  const stripe = Stripe(
    "pk_test_51PHlm505JICd8VkdCphQaa6MSgMfkNF9usoeTp8vWJNApvM40IrJjnW7ii69As9mCrtQpyAPiYHdxIqSVkLJg0RM00vygqrsgV"
  );
  let result;
  const { data } = await axios.post("/order/create-checkout-session", {
    orderItems,
  });
  console.log("data stripe ", data);
  if (data) {
    result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
    console.log("result stripe  redirectToCheckout", result);
  }
  if (result.error) {
    console.error(result.error.message);
  }
  return data;
};

export const updateOrderPaymentMethod = async ({ paymentMethodId, orderId }) => {
  const  {data} = await axios.post("order/update-order-with-payment-method", {
      paymentMethodId,
      orderId,
    });
  return data;
}

export const createPaymentIntentService = async (order) => {
  console.log("orderItems xx ", order);
  const { data } = await axios.post("/order/create-payment-intent", {
    order: order,
  });

  return data;
};

export const getOrderById = async (orderId) =>{
  const response = await axios.get(`/order/get-order/${orderId}`)
  console.log("order data in axios", response.data)
  return response.data;
};


export const getOrdersByUserService = async () => {
  const { data } = await axios.get(`/order/get-user-orders/`);
  return data;
};

export const updateOrder = async (orderId, updatedOrderItems) =>{

  console.log("update data in axios", updatedOrderItems)
  const response = await axios.post(`/order/update-order/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedOrderItems }),
    });

  if (!response.status === 200) {
    throw new Error('Failed to update order');
  }

  return response.data;
  
};

export const updateStatusOrder = async (orderId, updateData) => {

  console.log ("in service", updateData)


  const response = await axios.post(`/order/update-status-order/${orderId}`, updateData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to update order');
  }

  return response.data;
};
