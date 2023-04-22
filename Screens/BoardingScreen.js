import { useState } from 'react';
import { View, SafeAreaView, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AddressSheet } from '@stripe/stripe-react-native';
import { createUserWithEmailAndPassword } from '../BackendAPI/Authentication';





const OnboardingScreen = () => {
    
    const navigation = useNavigation();
    const [adressSheet, setAddressSheet] = useState(false);

 
    return(
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Restaurante</Text>

            <Pressable onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Text style={{color:'white'}}>Sign In</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('New user')} style={styles.button}>
                    <Text style={{color:'white'}}>Create Account</Text>
            </Pressable>

            {/* <AddressSheet
                presentationStyle='fullscreen'
                onSubmit={async (addressDetails) => {
                    // handle result
                    console.log(addressDetails);
                    if(createUserWithEmailAndPassword()){

                    }

                    setAddressSheet(false);

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
                }}
                onError={(error) => {
                    setAddressSheet(false)}}
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
                
            /> */}

        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },

    title: {
        fontWeight:'bold',
        fontSize: 36,
        color:'purple',
        alignSelf:'center',
        bottom: 50  
    },

    button: {
        marginTop: 20,
        height: 50,
        backgroundColor: 'purple',
        borderRadius: 8,
        borderWidth: 1,
        width: '90%',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 30

    },


});

export default OnboardingScreen;