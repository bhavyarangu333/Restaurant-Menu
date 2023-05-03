import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, Modal } from 'react-native';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import { getNearbyRegion, fetchMapsKey } from '../BackendAPI/Geocode';
import MapViewDirections from 'react-native-maps-directions'
import { useFocusEffect } from '@react-navigation/native';
import { googleKey } from '../App';
import User from '../Models/User';


const Maps = () => {

    // const [longitude, setLongitude] = useState(0);
    // const [latitude, setLatitude] = useState(0);

    // const region = () => {

    //     getNearbyRegion().then((res) => {
    //         setLatitude(res.lat);
    //         setLongitude(res.lng);
    //     })
    //     return {
    //         latitude: latitude,
    //         longitude:longitude,
    //         latitudeDelta: .009,
    //         longitudeDelta: .009
    //     };
    // };
    const origin = { latitude: 33.879799, longitude: -117.885231};
    const destination = { latitude: 33.8120918, longitude: -117.9189742};
   
    useEffect(()=>{
        
      },[])
      const markerPress = () => {
        console.log('Marker Pressed')
      }

    return (
        <View style={styles.container}>

            <MapView style={styles.map}
               region={{latitude:33.879799, longitude: -117.885231, latitudeDelta: .009,longitudeDelta: .009}}>

                <Marker
                    coordinate={{
                        latitude: 33.879799,
                        longitude: -117.885231,
                    }}
                     onCalloutPress={() => markerPress()}>

                    <Callout tooltip style={{height: 100, width:100, backgroundColor:'white'}}>
                        <Pressable>
                            <Text>Hellow</Text>
                        </Pressable>
                    </Callout>
                </Marker>

                <Marker
                    coordinate={{
                        latitude: 33.8120918,
                        longitude: -117.9189742,
                    }}
                     onCalloutPress={() => markerPress()}>

                    <Callout tooltip style={{height: 100, width:100, backgroundColor:'white'}}>
                        <Pressable>
                            <Text>Hellow</Text>
                        </Pressable>
                    </Callout>

                </Marker>
                
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={3}
                    apikey={googleKey}
                />

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