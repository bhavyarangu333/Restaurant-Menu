import {useEffect} from 'react';
import { SafeAreaView, View, Text, FlatList, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
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
        hours = <Text>Open</Text>
    }
    else {
        hours = <Text>Closed</Text>
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
                    <Text style={{fontSize: 14}}>{hours}</Text>
                    <Text style={{fontSize: 14}}>{props.route.params.location}</Text>
                </View>
                <Text style={{fontWeight:'bold', fontSize:25}}>Featured Items</Text>
                
                
            
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


});


export default RestaurantMenu;