import { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AddressSheet } from '@stripe/stripe-react-native';
import {db, auth} from '../firebase';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { saveUser } from '../BackendAPI/Read_Write_UserOrders';


const NewAuth = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [adressSheet, setAddressSheet] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
             <TextInput placeholder='Email'
                style={styles.input} 
                autoCapitalize='none' 
                autoCorrect={false}
                keyboardType='email-address'
                onChangeText={text => setEmail(text)}   
            />

            <TextInput placeholder='Password'
                style={styles.input} 
                autoCapitalize='none' 
                autoCorrect={false}
                keyboardType='email-address'
                onChangeText={text => setPassword(text)}   
            />

            <TextInput placeholder='Confirm Password'
                style={styles.input} 
                autoCapitalize='none' 
                autoCorrect={false}
                keyboardType='email-address'
                onChangeText={text => setConfirmPassword(text)}   
            />

            <Pressable style={styles.button} onPress={() => {
                fetchSignInMethodsForEmail(auth, email)
                    .then((result) => {
                        if (result.length !== 0) { alert("Registered Account"); }
                        else { setAddressSheet(true) }
                    });
            }} >
                <Text style={{color:'white'}}>Continue</Text>
            </Pressable>

            <AddressSheet
                presentationStyle='fullscreen'
                onSubmit={async (addressDetails) => {
                    // handle result                
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in 
                            saveUser(addressDetails.name, addressDetails.address.line1, addressDetails.address.postalCode, addressDetails.phone, addressDetails.address.city, addressDetails.address.country, addressDetails.address.state, userCredential.user.uid);
                            setAddressSheet(false);
                            navigation.navigate('Home');

                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorMessage);
                        });
                    
                }}
                visible={adressSheet}
                defaultValues={{
                    phone: '111-222-3333',
                    address: {
                    country: 'United States',
                    city: 'San Francisco',
                    },
                }}
                additionalFields={{
                    phoneNumber: 'required',
                    email:'required'
                }}
                onError={(error) => {
                    setAddressSheet(false);
                }}
                allowedCountries={['US', 'CA', 'GB']}
                primaryButtonTitle={'Save Info'}
                sheetTitle={'Create Account'}
                appearance = {{
                    primaryButton:{
                        colors:{
                            background: '#800080'
                        },
                    }
                }}
                
            />


        </SafeAreaView>
    );
};


const styles = StyleSheet.create({

        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems:'center'
        },

        input: {
            padding: 10,
            borderWidth: 1,
            borderRadius: 8,
            width: '90%',
            marginVertical: 10
        
        },

        button: {
            marginTop: 20,
            height: 50,
            backgroundColor: '#894AFF',
            borderRadius: 8,
            borderWidth: 1,
            width: '90%',
            justifyContent:'center',
            alignItems: 'center',
            marginBottom: 30
    
        },



});

export default NewAuth;