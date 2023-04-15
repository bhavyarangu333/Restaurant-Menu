import React, {useState} from 'react';
import {View, Text, TextInput, SafeAreaView, StyleSheet, Button} from 'react-native';
import { StripeProvider, CardField, useConfirmPayment, AddressSheet } from '@stripe/stripe-react-native';


const API_URL = 'http://localhost:3000';

const Payment = () => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
      };
    

    const handleSave = async () => {
        if (!cardDetails?.complete || !email) {
            alert("Please enter Complete card details and Email");
            return;
          }
          const billingDetails = {
            email: email,
          };
          //2.Fetch the intent client secret from the backend
          try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            //2. confirm the payment
            if (error) {
              console.log("Unable to process payment");
            } else {
              const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: "Card",
                billingDetails: billingDetails,
              });
              if (error) {
                alert(`Payment Confirmation Error ${error.message}`);
              } else if (paymentIntent) {
                alert("Payment Successful");
                console.log("Payment successful ", paymentIntent);
              }
            }
          } catch (e) {
            console.log(e);
          }
    };


    return (
        <StripeProvider publishableKey='pk_test_51MwZH3AmdXqnDkBiZ9qNGFWUQSY7TttOb7f6ro3nl0sX64NX1G1OKWkZsXxn9yHCss32ENmKOFVMasc7VKLMPyEn00hZpFZdrA'>
            <SafeAreaView style={styles.container}>

            <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}
            />
            <CardField
                placeholders={{
                    number: "4242 4242 4242 4242"
                }}
                postalCodeEnabled={false}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails);
                }}
            />

            <Button onPress={handleSave} title='Save' disabled={loading}/>
            
            </SafeAreaView>
        </StripeProvider>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'white',
    },

    input: {
        backgroundColor: "#efefefef",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
        margin:10,
        borderWidth:1
      },

      card: {
        backgroundColor: "#efefefef",
      },

      cardContainer: {
        height: 50,
        margin:10,
        borderWidth:1,
        borderRadius: 8,
        backgroundColor: '#efefefef'
      },


})


export default Payment;