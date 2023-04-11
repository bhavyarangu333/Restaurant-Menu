import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';



const Account = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}> 
            <Pressable style={styles.pressableContainer} onPress={() => navigation.navigate('Manage Account')}> 
                <Text style={styles.subHeader}>Manage Account</Text>
                <Text style={styles.subText}>Update information and manage your account</Text>
                <View style={styles.listSeparator}/>
            </Pressable>

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