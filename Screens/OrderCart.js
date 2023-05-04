import { useEffect, useState, useContext } from 'react';
import {SafeAreaView, Text, Pressable, View, StyleSheet, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { ScrollView } from 'react-native-gesture-handler';
import User from '../Models/User';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { makeDelivery } from '../BackendAPI/DoordashJWT';
import { deliveryTimeContext, pickupTimeContext } from './Contexts';



const OrderCart = (props) => {

    const API_URL = 'https://restaurante-api.vercel.app';
    const navigation = useNavigation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const { deliveryTime, setDeliveryTime } = useContext(deliveryTimeContext);
    const { pickupTime, setPickupTime } = useContext(pickupTimeContext);

    const PUBLISHABLE_KEY = 'pk_test_51MwZH3AmdXqnDkBiZ9qNGFWUQSY7TttOb7f6ro3nl0sX64NX1G1OKWkZsXxn9yHCss32ENmKOFVMasc7VKLMPyEn00hZpFZdrA';

    let child;
    
    navigation.setOptions({
        headerTitle: 'Your Cart'
    });

    const [totalPrice, setTotalPrice] = useState(0);
    let price = 0.0;
    useEffect(() => {

        if (props.route.params.orders.length !== 0) {

            props.route.params.orders.map((order) => {
                let cash = order.price.substring(order.price.indexOf('$') + 1);
                price += parseFloat(cash);
            });

            setTotalPrice(price);
        };

    },[])

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

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent?customerID=${User.stripeCustomerID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { paymentIntent, ephemeralKey, customer} = await response.json();
    
        return {
          paymentIntent,
          ephemeralKey,
          customer,
        };
      };
    

    const initializePaymentSheet = async () => {
        const {
          paymentIntent,
          ephemeralKey,
          customer,
        } = await fetchPaymentSheetParams();
    
        const { error } = await initPaymentSheet({
          merchantDisplayName: "Example, Inc.",
          customerId: customer,
          customerEphemeralKeySecret: ephemeralKey,
          paymentIntentClientSecret: paymentIntent,
          defaultBillingDetails: {
            name: 'Jane Doe',
        }
        });

        if (!error) {
          setLoading(true);
        }
      };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {

            makeDelivery().
                then((res) => {

                    const pst_dropoff = new Date(res.dropoff_time_estimated).
                    toLocaleString('en-US',{
                        timeZone:'America/Los_Angeles'
                    });

                    const dropoff_time = pst_dropoff.substring(pst_dropoff.indexOf(' ') + 1);
                    const dropoff_time_hour_min = dropoff_time.substring(0,5);
                    const dropoff_am_pm = dropoff_time.substring(8,11);
                     
                    const pst_pickup = new Date(res.pickup_time_estimated).toLocaleString('en-US',{
                        timeZone:'America/Los_Angeles'
                    });

                    const pickup_time = pst_pickup.substring(pst_pickup.indexOf(' ') + 1);
                    const pickup_time_hour_min = pickup_time.substring(0,5);
                    const pickup_am_pm = pickup_time.substring(8,11);
                    
                    setPickupTime(pickup_time_hour_min + pickup_am_pm);
                    setDeliveryTime(dropoff_time_hour_min + dropoff_am_pm);
                    navigation.navigate('Delivery', { orders:props.route.params.orders, location: props.route.params.location, name: props.route.params.name});
                });
        }
      };

    useEffect(() => {
        initializePaymentSheet();

    },[])

    return (
        <StripeProvider publishableKey={PUBLISHABLE_KEY}>
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    {child}
                    <View style={styles.menuRows}>
                        <Text style={{fontWeight:'bold'}}>Total:</Text>
                        <Text style={{fontWeight:'bold'}}>${totalPrice}</Text>
                    </View>
                    
                </ScrollView>
                <Pressable style={styles.checkoutButton} onPress={() => {openPaymentSheet()}} disabled={!loading}>
                    <Text style={{color:'white'}}>Checkout</Text>
                </Pressable>
            </SafeAreaView>
        </StripeProvider>
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