import React, {useState} from 'react';
import {View, Text, TextInput, SafeAreaView, StyleSheet} from 'react-native';



const Payment = () => {

    return (
        <SafeAreaView style={style.container}>

            <Text>Payment Options Page</Text>


        </SafeAreaView>

    )
}

const style = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },


})

export default Payment;