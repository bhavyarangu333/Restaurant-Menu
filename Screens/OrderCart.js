import { useEffect } from 'react';
import {SafeAreaView, Text, Pressable, View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { ScrollView } from 'react-native-gesture-handler';


const OrderCart = (props) => {
    const API_URL = 'https://restaurante-api.vercel.app'
    const navigation = useNavigation();
    
    navigation.setOptions({
        headerTitle: 'Your Cart'
    });

    let child;
    if (props.route.params.orders === undefined || props.route.params.orders.length === 0) {
        child = 
        <View style={{alignItems:'center', justifyContent:'center', marginTop: 20}}>
            <Text style={{fontWeight:'bold', fontSize: 20, color: '#894AFF'}}>Empty</Text>
        </View>
    }
    else {
        child = 
        <View>
            {
                props.route.params.orders.map((order) => {
                    return (
                        <View style={styles.menuRows}>
                            <Text style={styles.menuText}>{order.item}</Text>
                            <Text style={styles.menuText}>{order.price}</Text>
                        </View>
                    )
                })
            }
        </View>
    }
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
        // if (!cardDetails?.complete || !email) {
        //     alert("Please enter Complete card details and Email");
        //     return;
        //   }
          const billingDetails = {
            email: auth.currentUser.email
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

    useEffect(() => {
        
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                {child}
            </ScrollView>
            <Pressable onPress={() => {navigation.navigate('Delivery', { orders:props.route.params.orders, location: props.route.params.location, name: props.route.params.name})}} style={styles.checkoutButton}>
                <Text style={{color:'white'}}>Checkout</Text>
            </Pressable>
        </SafeAreaView>
    )
};





const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'space-between'
    },

    rowContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',

    },
    menuText: {
        fontWeight:'bold',
        fontSize: 15
    },
    checkoutButton: {
        height: 50,
        backgroundColor: '#894AFF',
        borderRadius: 8,
        borderWidth: 1,
        width: '90%',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 30,
        alignSelf: 'center'
    },
    menuRows: {
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#CED0CE'
    }


});

export default OrderCart;