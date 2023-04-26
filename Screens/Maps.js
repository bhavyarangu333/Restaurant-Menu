import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import { makeDelivery } from '../BackendAPI/DoordashJWT';
import {Marker} from 'react-native-maps';
import { getLatLng } from '../BackendAPI/Geocode';



const Maps = () => {

    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    useEffect(() => {
        const address = "800 N State College Blvd, Fullerton, CA 92831";
        getLatLng().then((res) => {
            console.log(res)
            setLatitude(res)});

        // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBGZ3oSQ3YgTwNfkJ62Q-5GaRZw9ReR1yY`)
        // .then((response) => {
        //     return response.json();
        // }).then(jsonData => {
        //     //console.log(jsonData.results[0].geometry.location); // {lat: 45.425152, lng: -75.6998028}
        //     console.log(jsonData.results[0].geometry.location.lng);
        //     console.log(jsonData.results[0].geometry.location.lat)

        //     setLongitude(jsonData.results[0].geometry.location.lng)
        //     setLatitude(jsonData.results[0].geometry.location.lat)
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: -117,
                    latitudeDelta: .09,
                    longitudeDelta: .09,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        //latitudeDelta: 0.0922,
                        //longitudeDelta: 0.0421
                    }}
                    
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
});

export default Maps;