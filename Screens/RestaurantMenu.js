import {useEffect} from 'react';
import { SafeAreaView, View, Text, FlatList, ScrollView, Pressable, StyleSheet, Image, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



const RestaurantMenu = (props) => {

    const navigation = useNavigation();
    navigation.setOptions({
        headerTitle: 'Order',
      });
    
    useEffect(() => {
        //console.log(props.route.params.menuPhoto)
    },[])

    let hours;

    if (props.route.params.open) {
        hours = <Text style={{fontSize: 14}}>Open</Text>
    }
    else {
        hours = <Text style={{fontSize: 14}}>Closed</Text>
    }

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
                    {/* <Text style={{fontSize: 14}}>{hours}</Text> */}
                    {hours}
                    <Text style={{fontSize: 14}}>{props.route.params.location}</Text>
                </View>

                <Text style={styles.subHeader}>Featured Items</Text>

                <Pressable style={styles.menuButtons} onPress={() => {}}>
                    <Text style={styles.menuTitle}>Combo A</Text>
                    <Text>Fried rice, teriyaki chicken, and veggies</Text>
                    <Text>$10.99</Text>
                </Pressable>

                <View style={styles.listSeparator}/>

                
                <Pressable style={styles.menuButtons} onPress={() => {}}>
                    <Text style={styles.menuTitle}>Combo B</Text>
                    <Text>Chow Mein, Orange Chicken, and veggies</Text>
                    <Text>$11.99</Text>
                </Pressable>

                <View style={styles.listSeparator}/>

                <Pressable style={styles.menuButtons} onPress={() => {}}>
                    <Text style={styles.menuTitle}>Chow Mein</Text>
                    <Text>$4.99</Text>
                </Pressable>

                <View style={{borderBottomWidth:10, borderBottomColor:'#DCDCDC', marginBottom: 20}}/>

                <Text style={styles.subHeader}>Soft Drinks</Text>

                <Pressable style={styles.menuButtons} onPress={() => {}}>
                    <Text style={styles.menuTitle}>Horchata</Text>
                    <Text>$3.99</Text>
                </Pressable>

                <View style={styles.listSeparator}/>

                <Pressable style={styles.menuButtons} onPress={() => {}}>
                    <Text style={styles.menuTitle}>Coca Cola</Text>
                    <Text>$2.99</Text>
                </Pressable>

                <View style={styles.listSeparator}/>

                <Pressable style={styles.menuButtons} onPress={() => {}}>
                    <Text style={styles.menuTitle}>Bottled Water</Text>
                    <Text>$1.99</Text>
                </Pressable>

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
    }


});


export default RestaurantMenu;