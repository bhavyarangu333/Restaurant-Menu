import { useState } from 'react';
import { StyleSheet } from "react-native";
import { AddressSheet } from '@stripe/stripe-react-native'

const Address = () => {
    const [adressSheet, setAddressSheet] = useState(false)
    return (
        <AddressSheet
        presentationStyle='popover'
            visible={adressSheet}
            appearance={{
                colors: {
                primary: '#F8F8F2',
                background: 'white',
                margin: 10
                }
            }}
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
            onError={(error) => {setAddressSheet(false)}}
            allowedCountries={['US', 'CA', 'GB']}
            primaryButtonTitle={'Use this address'}
            sheetTitle={'Shipping Address'}
            
        />
    )
};


const ManageAccount = () => {
    return(

        <Address/>
    )
}


const style = StyleSheet.create({


    container:{
        flex: 1,
        backgroundColor:'white',
    },
})


export default ManageAccount;