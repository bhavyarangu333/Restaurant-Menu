import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { getRegion } from '../BackendAPI/Geocode';



const Maps = () => {

    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    // const region = () => {

    //     getRegion().then((res) => {
    //         setLatitude(res[0]);
    //         setLongitude(res[1]);
    //     })
    //     return {
    //         latitude: latitude,
    //         longitude:longitude,
    //         latitudeDelta: .009,
    //         longitudeDelta: .009
    //     };
    // };

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {/* // region={region()}
                // onPress={() => console.log(latitude, longitude)}>
                
                // <Marker
                //     coordinate={{
                //         latitude: latitude,
                //         longitude: longitude,
                //     }}    
                // /> */}
                
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