import { useCallback, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import { createToken } from '../BackendAPI/DoordashJWT';
import { auth } from '../firebase';
import { makeDelivery } from '../BackendAPI/DoordashJWT';



const Maps = () => {

    useFocusEffect(
        useCallback(() => {

            return () => {console.log("Unfocused here.")};
            },[])
    );
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
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