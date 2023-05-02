import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import { StripeProvider, CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';
import User from '../Models/User';


const API_URL = 'https://restaurante-api.vercel.app';

const Payment = () => {
   
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const PUBLISHABLE_KEY = 'pk_test_51MwZH3AmdXqnDkBiZ9qNGFWUQSY7TttOb7f6ro3nl0sX64NX1G1OKWkZsXxn9yHCss32ENmKOFVMasc7VKLMPyEn00hZpFZdrA'

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        });
        const { setupIntent, ephemeralKey, customer } = await response.json();
        User.stripeCustomerID = customer;
        return {
        setupIntent,
        ephemeralKey,
        customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
        setupIntent,
        ephemeralKey,
        customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            setupIntentClientSecret: setupIntent,
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        // see below
        const { error } = await presentPaymentSheet();

        if (error) {
            alert(`Error code: ${error.code}`, error.message);
        } else {
            alert('Payment Saved Successfully', 'Your payment method is successfully set up for future payments!');
            console.log(User.stripeCustomerID);
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);


    return (
        <StripeProvider publishableKey={PUBLISHABLE_KEY}>
            <SafeAreaView style={styles.container}>

            <Pressable disabled={!loading} onPress={() => openPaymentSheet()} style={{justifyContent: 'center', alignItems:'center', margin: 10, backgroundColor:'#894AFF', height:40, borderRadius:8}}>
                <Text style={{color:'white'}}>Set Up Payment</Text>
            </Pressable>

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