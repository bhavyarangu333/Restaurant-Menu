import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { fetchRestaurants } from '../BackendAPI/Geocode';
import Ionicons from '@expo/vector-icons/Ionicons';



const Maps = () => {

    const [chineseRestaurants, setChineseRestaurants] = useState([]);
    const [indianRestaurants, setIndianRestaurants] = useState([]);
    const [mexicanRestaurants, setMexicanRestaurants] = useState([]);
    const [fastfoodRestaurants, setFastfoodRestaurants] = useState([]);
    
   
    useEffect(()=>{

        fetchRestaurants()
        .then((res) => {
            setChineseRestaurants(res.chinese_food.results);
            setIndianRestaurants(res.indian_food.results);
            setMexicanRestaurants(res.mexican_food.results);
            setFastfoodRestaurants(res.fast_food.results);
        });
        
    },[])

    
    return (
        <View style={styles.container}>

            <MapView style={styles.map}
               region={{latitude:33.879799, longitude: -117.885231, latitudeDelta: .009,longitudeDelta: .009}}>

                <Marker
                    coordinate={{
                        latitude: 33.879799,
                        longitude: -117.885231,
                    }}>

                </Marker>

                
                {
                    chineseRestaurants.map((res) => {
                        return (
                            <Marker coordinate={{latitude: res.geometry.location.lat, longitude: res.geometry.location.lng}}>
                                <Callout>
                                    <View style={{height:150, width: 200, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{fontWeight:'bold', color:'purple', fontSize:16}}>{res.name}</Text>
                                        <Text>{res.vicinity}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text>{res.rating}</Text>
                                            <Ionicons name='star' size={15} style={{color:'purple'}}/>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }

                {
                    indianRestaurants.map((res) => {
                        return (
                            <Marker coordinate={{latitude: res.geometry.location.lat, longitude: res.geometry.location.lng}}>
                                <Callout>
                                    <View style={{height:150, width: 200, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{fontWeight:'bold', color:'purple', fontSize:16}}>{res.name}</Text>
                                        <Text>{res.vicinity}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text>{res.rating}</Text>
                                            <Ionicons name='star' size={15} style={{color:'purple'}}/>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }

                {
                    mexicanRestaurants.map((res) => {
                        return (
                            <Marker coordinate={{latitude: res.geometry.location.lat, longitude: res.geometry.location.lng}}>
                                <Callout>
                                    <View style={{height:150, width: 200, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{fontWeight:'bold', color:'purple', fontSize:16}}>{res.name}</Text>
                                        <Text>{res.vicinity}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text>{res.rating}</Text>
                                            <Ionicons name='star' size={15} style={{color:'purple'}}/>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }

                {
                    fastfoodRestaurants.map((res) => {
                        return (
                            <Marker coordinate={{latitude: res.geometry.location.lat, longitude: res.geometry.location.lng}}>
                                <Callout>
                                    <View style={{height:150, width: 200, justifyContent:'center', alignItems:'center'}}>
                                        <Text style={{fontWeight:'bold', color:'purple', fontSize:16}}>{res.name}</Text>
                                        <Text>{res.vicinity}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text>{res.rating}</Text>
                                            <Ionicons name='star' size={15} style={{color:'purple'}}/>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })
                }
                
            </MapView>

        </View>

    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    map: {
        width: '100%',
        height: '100%',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '50%',
        alignItems:'center',
        justifyContent:'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    
    buttonClose: {
        backgroundColor: '#894AFF',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        height: 200,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent:'center',
      },
      
});

export default Maps;