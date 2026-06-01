import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutForm from './CheckoutForm';
import Layout from '../../layout/Layout';

const STRIPE_PUBLIC_KEY = 'pk_test_51PHlm505JICd8VkdCphQaa6MSgMfkNF9usoeTp8vWJNApvM40IrJjnW7ii69As9mCrtQpyAPiYHdxIqSVkLJg0RM00vygqrsgV';

export default function CheckoutPage() {
  return (
    <Layout>
    <View style={styles.container}>
      <Text style={styles.title}>PAIEMENT</Text>
      <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
        <CheckoutForm />
      </StripeProvider>
    </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
