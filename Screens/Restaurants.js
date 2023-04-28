import { useEffect, useState } from 'react';
import { SafeAreaView, Text, Pressable, View, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { fetchPhotos, fetchRestaurants } from '../BackendAPI/Geocode';
import Ionicons from '@expo/vector-icons/Ionicons';






const Restaurants = () => {
    
    //const [photoURI, setPhotoURI] = useState('');
    const [indianFood, setIndianFood] = useState([]);
    const [chineseFood, setChineseFood] = useState([]);
    const [mexicanFood, setMexicanFood] = useState([]);
    const [fastfoodFood, setFastfoodFood] = useState([]);

    useEffect(() => {
        // fetchPhotos()
        // .then((res) => {
        //     //console.log(res);
        //     setPhotoURI(res.result)
        //     //console.log(photoURI)
        // })
        fetchRestaurants()
        .then((res) => {
            setChineseFood(res.chinese_food.results);
            setIndianFood(res.indian_food.results);
            setMexicanFood(res.mexican_food.results);
            setFastfoodFood(res.fast_food.results);
        })

    }, [])

    const RenderRestaurants = ({restaurantData}) => {
        const [photoURI, setPhotoURI] = useState('');
        useEffect(() => {
            const photoRef = restaurantData.photos[0].photo_reference;
            fetchPhotos(photoRef)
                .then((res) => {
                    setPhotoURI(res.result)
                })
        }, [])

        return(
            <View style={styles.container}>
                <View style={{height: 200, width:200, marginHorizontal: 10}}>
                    <Image source={{uri: photoURI}} style={{flex:1, resizeMode:'cover'}}/>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'bold', width:'60%'}} numberOfLines={1}>{restaurantData.name}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text>{restaurantData.rating}</Text>
                            <Ionicons name='star' size={15}/>
                        </View>
                    </View>
                    <Text style={{marginBottom:10}} numberOfLines={1}>{restaurantData.vicinity}</Text>
                </View>
                <View style={styles.listSeparator}/>

            </View>
            
        
        )
    };
    
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'space-between'}} nestedScrollEnabled={true}>

                <Text style={styles.headerText}>Restaurants</Text>
                <Text style={styles.subHeaders}>Chinese</Text>

                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={chineseFood}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}
                />

                <Text style={styles.subHeaders}>Mexican</Text>
                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={mexicanFood}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}
                />
                <Text style={styles.subHeaders}>Indian</Text>
                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={indianFood}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}

                />
                <Text style={styles.subHeaders}>Fast Food</Text>
                <FlatList
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                    data={fastfoodFood}
                    renderItem={({item}) => <RenderRestaurants restaurantData={item}/>}

                />
                

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
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 20
    },
    subHeaders: {
        fontSize: 20,
        fontWeight:'bold',
        color: '#894AFF',
        marginTop: 10,
        marginHorizontal: 10,
    },

    listSeparator: {
        borderBottomWidth:10,
        borderBottomColor:'#DCDCDC'
    }

});

export default Restaurants;