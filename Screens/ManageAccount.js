import React from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet } from "react-native";



const ManageAccount = () => {
    return(
        <SafeAreaView style={style.container}>
            <Text style={{margin: 10}}>First Name</Text>
            <TextInput style={style.input} placeholder="First Name"/>
            <Text style={{margin: 10}}>Last Name</Text>
            <TextInput style={style.input} placeholder="Last Name"/>
            <Text style={{margin: 10}}>Email</Text>
            <TextInput style={style.input} placeholder="Email"/>
            <Text style={{margin: 10}}>Home Address</Text>
            <TextInput style={style.input} placeholder="Home Address"/>
            
        </SafeAreaView>
    )
}


const style = StyleSheet.create({


    container:{
        flex: 1,
        backgroundColor:'white',
    },
    input: {
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        height: 55,
        marginHorizontal:10     
      },
})


export default ManageAccount;