import { useState } from 'react';
import { View, SafeAreaView, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AddressSheet } from '@stripe/stripe-react-native';



const SignUp = () => {
    
    const navigation = useNavigation();
    const [adressSheet, setAddressSheet] = useState(false);
    
    return(
        <SafeAreaView style={styles.container}>
            
            <AddressSheet
                presentationStyle='fullscreen'
                onSubmit={async (addressDetails) => {
                    // handle result
                    console.log(addressDetails);

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
                primaryButtonTitle={'Save'}
                sheetTitle={'Manage Account'}
                
            />

        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
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

export default SignUp;