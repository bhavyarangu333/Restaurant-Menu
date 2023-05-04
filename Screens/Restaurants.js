import { useEffect, useState, useContext } from 'react';
import { SafeAreaView, Text, Pressable, View, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { fetchPhotos, fetchRestaurants } from '../BackendAPI/Geocode';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


const Restaurants = () => {
    
    
    const [chineseRestaurants, setChineseRestaurants] = useState([]);
    const [indianRestaurants, setIndianRestaurants] = useState([]);
    const [mexicanRestaurants, setMexicanRestaurants] = useState([]);
    const [fastfoodRestaurants, setFastfoodRestaurants] = useState([]);


    useEffect(() => {
       
        fetchRestaurants()
        .then((res) => {
            setChineseRestaurants(res.result[0].chinese_food.results);
            setIndianRestaurants(res.result[0].indian_food.results);
            setMexicanRestaurants(res.result[0].mexican_food.results);
            setFastfoodRestaurants(res.result[0].fast_food.results);
        });

    }, [])

    const RenderRestaurants = ({restaurantData}) => {

        const [photoURI, setPhotoURI] = useState('');
        const navigate = useNavigation();

        useEffect(() => {
            const photoRef = restaurantData.photos[0].photo_reference;
            fetchPhotos(photoRef)
                .then((res) => {
                    setPhotoURI(res.result)
                })
        }, [])

        return(
            <View style={styles.container}>
                
                <Pressable style = {styles.buttonContainer} onPress={() => navigate.navigate('RestaurantMenu', {restaurantName: restaurantData.name, menuPhoto: photoURI, rating: restaurantData.rating, open:restaurantData.opening_hours.open_now, location:restaurantData.vicinity })}>
                            <Image source={{uri: photoURI}} style={{flex:1, resizeMode:'cover', borderRadius:5}}/>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontWeight:'bold', width:'60%'}} numberOfLines={1}>{restaurantData.name}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text>{restaurantData.rating}</Text>
                                    <Ionicons name='star' size={15}/>
                                </View>
                            </View>
                            <Text style={{marginBottom:10}} numberOfLines={1}>{restaurantData.vicinity}</Text>
                </Pressable>

            </View>
        )
    };
    
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'space-between'}} nestedScrollEnabled={true}>
                <View style={styles.titleContainer}>
                    <Text style={styles.headerText}>Restaurants</Text>
                </View>

                <Text style={styles.subHeaders}>Chinese</Text>

                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={chineseRestaurants}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}
                />

                <View style={styles.listSeparator}/>


                <Text style={styles.subHeaders}>Mexican</Text>
                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={mexicanRestaurants}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}
                />
                
                <View style={styles.listSeparator}/>

                <Text style={styles.subHeaders}>Indian</Text>
                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={indianRestaurants}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}
                />
                
                <View style={styles.listSeparator}/>

                <Text style={styles.subHeaders}>Fast Food</Text>
                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={fastfoodRestaurants}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}
                />
                
                <View style={styles.listSeparator}/>


            </ScrollView>
            
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 25,
        fontWeight:'bold',
        color: '#894AFF',
    },

    titleContainer: {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#CED0CE',
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom:20,
    },

    subHeaders: {
        fontSize: 20,
        fontWeight:'bold',
        color: '#894AFF',
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 10
    },

    listSeparator: {
        borderBottomWidth:10,
        borderBottomColor:'#DCDCDC'
    },

    buttonContainer:{
        height: 200,
        width: 200,
        marginHorizontal: 10
    }

});

export default Restaurants;