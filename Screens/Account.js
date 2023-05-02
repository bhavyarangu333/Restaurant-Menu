import { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Pressable, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AddressSheet } from '@stripe/stripe-react-native';
import { getUser } from '../BackendAPI/Read_Write_UserOrders';
import { fetchRestaurants, fetchPhotos, getNearbyRegion } from '../BackendAPI/Geocode';
import { makeDelivery } from '../BackendAPI/DoordashJWT';


const Account = () => {
    const navigation = useNavigation();
    const [adressSheet, setAddressSheet] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [postal, setPostal] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');

    useEffect(() => {
        // getUser().then((res) => {
        //     setAddress(res["address"]);
        //     setCity(res["city"]);
        //     setCountry(res["country"]);
        //     setName(res["name"]);
        //     setPhone(res["phone"]);
        //     setPostal(res["postal_code"]);
        //     setState(res["state"]);            
        // });
        //fetchNearbyRestaurants();
        // fetchPhotos()
        //     .then((res) => {console.log(res)});
        //useEndpoint()
        // fetchRestaurants()
        //     .then((res) => {
        //         console.log(res)
        //     });
        // makeDelivery()
        //     .then((res) => {
        //         console.log(res)
        //     })
        // fetchRestaurants()
        //     .then((res) => {console.log(res.result.results.length)});
        // getNearbyRegion()
        // .then((res) => {console.log(res)});
        // fetchPhotos()
        // .then(res => console.log(res.result)) 
        // makeDelivery()
        //     .then((res) => {console.log(res)})
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <Pressable style={styles.pressableContainer} onPress={() => setAddressSheet(true)}> 
                <Text style={styles.subHeader}>Manage Account</Text>
                <Text style={styles.subText}>Update information and manage your account</Text>
                <View style={styles.listSeparator}/>
            </Pressable>
            
            
            <AddressSheet
                presentationStyle='fullscreen'
                onSubmit={async (addressDetails) => {
                    // handle result
                    console.log(addressDetails);

                    setAddressSheet(false);

                }}
                visible={adressSheet}
                defaultValues={{
                    phone: phone,
                    name: name,
                    address: {
                        country: country,
                        city: city,
                        line1: address,
                        state: state,
                        postalCode: postal
                    },
                }}
                additionalFields={{
                    phoneNumber: 'required',
                }}
                onError={(error) => {
                    setAddressSheet(false)}}
                allowedCountries={['US', 'CA', 'GB']}
                primaryButtonTitle={'Save'}
                sheetTitle={'Manage Account'}
                
            />

            <Pressable style={styles.pressableContainer} onPress={() => navigation.navigate('Manage Payment')}> 
                <Text style={styles.subHeader}>Payment</Text>
                <Text style={styles.subText}>Manage Payments</Text>
                <View style={styles.listSeparator}/>
            </Pressable>

            <Pressable style={styles.pressableContainer}> 
                <Text style={styles.subHeader}>Log Out</Text>
                <View style={styles.listSeparator}/>
            </Pressable>
            
        </SafeAreaView> 
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    listSeparator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:'#DCDCDC',
        marginTop:10,
        marginBottom:10
    },

    pressableContainer:{
        marginHorizontal:10
    },

    subHeader:{
        fontSize:16,
        fontWeight:'bold'
    },

    subText:{
        fontSize:11
    },

});

export default Account;