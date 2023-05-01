import {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, FlatList, ScrollView, Pressable, StyleSheet, Image, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



const RestaurantMenu = (props) => {

    const navigation = useNavigation();
    navigation.setOptions({
        headerTitle: 'Order',
        headerRight: () => (
            <Ionicons name='cart' size={25} style={{marginRight:15}} onPress={() => { navigation.navigate('Cart', {orders:currentItem, location:props.route.params.location, name: props.route.params.restaurantName}) }}/>
        )
      });
    
    useEffect(() => {

        setCurrentItem([{item: 'Combo B', price: '$10.11'}]);
        

    },[]);

    let hours;

    if (props.route.params.open) {
        hours = <Text style={{fontSize: 14}}>Open</Text>
    }
    else {
        hours = <Text style={{fontSize: 14}}>Closed</Text>
    }

    const addToCart = (itemName, priceOfItem ) => {
        setCurrentItem([...currentItem, {item: itemName, price: priceOfItem}]);
    };

    const [orders, setOrder] = useState([{}]);
    const [currentItem, setCurrentItem] = useState([{}]);

    return (
        <SafeAreaView style={styles.container}>
            
            <ScrollView contentContainerStyle={{flexGrow:1}}>

                <View style={styles.imageContainer}>
                    <Image source={{uri: props.route.params.menuPhoto}} style={styles.image}/>
                </View>

                <Text style={styles.headerTitle}>{props.route.params.restaurantName}</Text>

                <View style = {{flexDirection:'row', marginHorizontal:20, marginBottom:5}}>
                    <Text style={{fontWeight:'bold', fontSize:14}}>{props.route.params.rating}</Text>
                    <Ionicons name = 'star' size={15} color='#894AFF'/>
                </View>

                <View style = {{borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#CED0CE', marginBottom: 20, marginHorizontal:20}}>
                    {hours}
                    <Text style={{fontSize: 14}}>{props.route.params.location}</Text>
                </View>

                <Text style={styles.subHeader}>Featured Items</Text>

                <View style={styles.menuButtons}>
                    <Text style={styles.menuTitle}>Combo A</Text>
                    <Text>Fried rice, teriyaki chicken, and veggies</Text>
                    <Text>$10.99</Text>
                    <Pressable style={styles.orderButtonContainer} onPress={() => {
                        Alert.alert('Cart', 'Add to Cart?',[
                            {
                                text: 'Cancel',
                                onPress: () => console.log("Cancelled pressed"),
                                style: 'cancel',
                            },
                            {
                                text: 'Add to Cart',
                                onPress: () => {
                                    addToCart('Combo A', '$10.99')
                                    console.log(currentItem)
                            }
                            }
                        ])
                    }}>
                        <Text>Add to Cart</Text>
                    </Pressable>
                </View>

                <View style={styles.listSeparator}/>

                
                <View style={styles.menuButtons}>
                    <Text style={styles.menuTitle}>Combo B</Text>
                    <Text>Chow Mein, Orange Chicken, and veggies</Text>
                    <Text>$11.99</Text>
                    <Pressable style={styles.orderButtonContainer}>
                        <Text>Add to Cart</Text>
                    </Pressable>
                </View>

                <View style={styles.listSeparator}/>

                <View style={styles.menuButtons}>
                    <Text style={styles.menuTitle}>Chow Mein</Text>
                    <Text>$4.99</Text>
                    <Pressable style={styles.orderButtonContainer}>
                        <Text>Add to Cart</Text>
                    </Pressable>
                </View>

                <View style={{borderBottomWidth:10, borderBottomColor:'#DCDCDC', marginBottom: 20}}/>

                <Text style={styles.subHeader}>Soft Drinks</Text>

                <View style={styles.menuButtons}>
                    <Text style={styles.menuTitle}>Horchata</Text>
                    <Text>$3.99</Text>
                    <Pressable style={styles.orderButtonContainer}>
                        <Text>Add to Cart</Text>
                    </Pressable>
                </View>

                <View style={styles.listSeparator}/>

                <View style={styles.menuButtons}>
                    <Text style={styles.menuTitle}>Coca Cola</Text>
                    <Text>$2.99</Text>
                    <Pressable style={styles.orderButtonContainer}>
                        <Text>Add to Cart</Text>
                    </Pressable>
                </View>

                <View style={styles.listSeparator}/>

                <View style={styles.menuButtons}>
                    <Text style={styles.menuTitle}>Bottled Water</Text>
                    <Text>$1.99</Text>
                    <Pressable style={styles.orderButtonContainer}>
                        <Text>Add to Cart</Text>
                    </Pressable>
                </View>

                <View style={styles.listSeparator}/>

            </ScrollView>
            
        </SafeAreaView>
    );

};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },

    imageContainer: {
        width:'100%',
        height: 200,
        marginBottom: 20
    },
    image: {
        flex:1,
        resizeMode:'cover'
    },
    orderButtonContainer:{
        height:20,
        width:100,
        backgroundColor:'lightgrey',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },
    headerTitle: {
        fontWeight:'bold',
        marginHorizontal: 20,
        fontSize: 32,
    },
    listSeparator: {
        borderBottomWidth:10,
        borderBottomColor:'#DCDCDC'
    },
    menuButtons: {
        marginHorizontal: 10,
        height: 100,
        width:'100%',
        justifyContent:'center'
    },
    menuTitle:{
        fontSize:15,
        fontWeight:'bold'
    },
    subHeader:{
        marginHorizontal:10,
        fontWeight:'bold',
        fontSize:25,
        marginBottom: 10
    },
    


});


export default RestaurantMenu;