import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import { StripeProvider, CardField, useConfirmPayment, useStripe } from '@stripe/stripe-react-native';


const API_URL = 'http://localhost:3000';

const Payment = () => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loadingPayment } = useConfirmPayment();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        });
        const { setupIntent, ephemeralKey, customer } = await response.json();

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
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    

    // const fetchPaymentIntentClientSecret = async () => {
    //     const response = await fetch(`${API_URL}/create-payment-intent`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     const { clientSecret, error } = await response.json();
    //     return { clientSecret, error };
    //   };
    

    // const handleSave = async () => {
    //     if (!cardDetails?.complete || !email) {
    //         alert("Please enter Complete card details and Email");
    //         return;
    //       }
    //       const billingDetails = {
    //         email: email,
    //       };
    //       //2.Fetch the intent client secret from the backend
    //       try {
    //         const { clientSecret, error } = await fetchPaymentIntentClientSecret();
    //         //2. confirm the payment
    //         if (error) {
    //           console.log("Unable to process payment");
    //         } else {
    //           const { paymentIntent, error } = await confirmPayment(clientSecret, {
    //             paymentMethodType: "Card",
    //             billingDetails: billingDetails,
    //           });
    //           if (error) {
    //             alert(`Payment Confirmation Error ${error.message}`);
    //           } else if (paymentIntent) {
    //             alert("Payment Successful");
    //             console.log("Payment successful ", paymentIntent);
    //           }
    //         }
    //       } catch (e) {
    //         console.log(e);
    //       }
    // };


    return (
        <StripeProvider publishableKey='pk_test_51MwZH3AmdXqnDkBiZ9qNGFWUQSY7TttOb7f6ro3nl0sX64NX1G1OKWkZsXxn9yHCss32ENmKOFVMasc7VKLMPyEn00hZpFZdrA'>
            <SafeAreaView style={styles.container}>

            {/* <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}
            /> */}
            {/* <CardField
                placeholders={{
                    number: "4242 4242 4242 4242"
                }}
                postalCodeEnabled={false}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails);
                }}
            /> */}

            {/* <Button onPress={handleSave} title='Save' disabled={loadingPayment}/> */}
            
            <Pressable disabled={!loading} onPress={() => openPaymentSheet()} style={{justifyContent: 'center', alignItems:'center', margin: 10, backgroundColor:'black', height:40, borderRadius:8}}>
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