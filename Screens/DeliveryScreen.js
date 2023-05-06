import { useCallback, useEffect, useState, useContext } from 'react';
import { Pressable, StyleSheet, View, Text, Modal } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps'
import { getNearbyRegion } from '../BackendAPI/Geocode';
import MapViewDirections from 'react-native-maps-directions';
import { googleKey } from '../App';
import User from '../Models/User';
import { deliveryTimeContext, pickupTimeContext } from './Contexts';



const DeliveryScreen = (props) => {

    const origin = { latitude: 33.879799, longitude: -117.885231};
    const destination = { latitude: props.route.params.lat, longitude: props.route.params.lng};
    const [modalVisible, setModalVisible] = useState(false);
    const { deliveryTime, setDeliveryTime } = useContext(deliveryTimeContext);
    const { pickupTime, setPickupTime } = useContext(pickupTimeContext);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
               region={{latitude:33.879799, longitude: -117.885231, latitudeDelta: .009,longitudeDelta: .009}}>

                <Marker
                    coordinate={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                    }}
                />

                <Marker
                    coordinate={{
                        latitude: props.route.params.lat,
                        longitude: props.route.params.lng,
                    }}
                />

                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    strokeWidth={3}
                    strokeColor={'#894AFF'}
                    apikey={googleKey}
                />
            </MapView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {setModalVisible(!modalVisible);}}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold'}}>{props.route.params.name}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>Pick Up: </Text>
                            <Text>{props.route.params.location}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>Drop off: </Text>
                            <Text>800 N State College Blvd</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>Pick Up Time: </Text>
                            <Text>{pickupTime}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text>Delivery Time: </Text>
                            <Text>{deliveryTime}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginBottom:20}}>
                            <Text>Cost: </Text>
                            <Text>${props.route.params.cost}</Text>
                        </View>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{color:'white'}}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Pressable onPress={() => setModalVisible(true)} style={{height:50, width: '60%', backgroundColor: '#894AFF', position:'absolute', justifyContent:'center', alignItems:'center', alignSelf:'center', bottom:0, marginBottom: 10, borderWidth: 1, borderRadius: 8 }}>
                <Text style={{color:'white'}}>View Order Details</Text>
            </Pressable>

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

export default DeliveryScreen;