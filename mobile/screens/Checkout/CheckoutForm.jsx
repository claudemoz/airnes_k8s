import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../components/shared/CustomButton';
//import { createPaymentIntent, clearCart } from '../redux/slices/orders';

const CheckoutForm = () => {
  const [fullname, setFullname] = useState('');
  const [errors, setErrors] = useState({});
  const stripe = useStripe();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const orderData = route.params?.orderData;
  const { totalPriceToCart, cart } = useSelector((state) => state.cart);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = "Ce champ est obligatoire";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const order = {
        products: cart?.map((p) => ({ productId: p._id, quantity: p.quantity })),
        totalPrice: totalPriceToCart,
        delivery: {
          firstname: orderData?.firstname,
          lastname: orderData?.lastname,
          address: orderData?.address1,
          city: orderData?.city,
        },
      };

      //const { payload } = await dispatch(createPaymentIntent(order));

      if (payload?.clientSecret && payload?.order._id) {
        const { clientSecret } = payload;
        const { error, paymentIntent } = await stripe.confirmPayment({
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails: {
              name: fullname,
            },
          },
          clientSecret,
        });

        if (error) {
          console.error("Payment error:", error.message);
          return;
        }

        /*if (paymentIntent.status === "Succeeded") {
          navigation.navigate('PaymentSuccessful', { order: payload.order });
          setTimeout(() => {
            dispatch(clearCart());
          }, 1000);
        }*/
      }
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Nom complet</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={setFullname}
      />
      {errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}

      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.cardField}
        style={styles.cardContainer}
      />
      <CustomButton
        title="Payer"
        style={styles.button}
        styleTitle={styles.buttonTitle}
      />
    </View>
  );
};

export default CheckoutForm;

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  button: {
    marginTop: 40,
    padding : 15

  },
  buttonTitle: {
    fontSize: 17,

  },
  cardField: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: 'red',
  },
});
