import { useState } from 'react';
import { View, SafeAreaView, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const OnboardingScreen = () => {
    
    const navigation = useNavigation();
    const [adressSheet, setAddressSheet] = useState(false);

 
    return(
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Welcome!</Text>

            <Pressable onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Text style={{color:'white'}}>Sign In</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('New user')} style={styles.button}>
                    <Text style={{color:'white'}}>Create Account</Text>
            </Pressable>

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
        color:'#894AFF',
        alignSelf:'center',
        bottom: 50  
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

export default OnboardingScreen;