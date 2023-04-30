import {} from 'react';
import {SafeAreaView, Text, Pressable, View, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const OrderCart = (props) => {
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
                        <View style={{marginTop: 10, marginHorizontal: 10, flexDirection:'row', justifyContent:'space-between', borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#CED0CE'}}>
                            <Text style={styles.menuText}>{order.item}</Text>
                            <Text style={styles.menuText}>{order.price}</Text>
                        </View>
                    )
                })
            }
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            {child}
            <Pressable style={styles.checkoutButton}>
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
    }


});

export default OrderCart;