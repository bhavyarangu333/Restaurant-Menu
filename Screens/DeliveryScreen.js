import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { getNearbyRegion } from '../BackendAPI/Geocode';
import MapViewDirections from 'react-native-maps-directions'



const DeliveryScreen = () => {

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

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
               region={{latitude:33.879799, longitude: -117.885231, latitudeDelta: .009,longitudeDelta: .009}}>

                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                />

                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                />

                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={'AIzaSyBw3frPN_CVAPu-n-NfK_oSohk26_XgU0A'}
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

export default DeliveryScreen;