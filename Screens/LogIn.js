import { useState } from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';



const Login = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            
                <Text style={styles.title}>Restaurante</Text>

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
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />

                <Pressable onPress={() => {
                    signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                        // Signed in 
                            navigation.navigate('Home');
                        })
                        .catch((error) => {
                            console.log(error.message);
                            alert("Invalid Credentials");
                        });
                  
                }} style={styles.button}>
                    <Text style={{color:'white'}}>Log In</Text>
                </Pressable>

                <View style={styles.row}>
                    <Text>Forgot Password? </Text>
                    <Pressable>
                        <Text style={styles.subText}>Reset Password</Text>
                    </Pressable>
                </View>

                
        </SafeAreaView>
    );

};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center',
    },
    main: {
        flex: 1,
        justifyContent: 'center',
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

    title: {
        fontWeight:'bold',
        fontSize: 36,
        color:'#894AFF',
        alignSelf:'center',
        bottom: 50  
    },
    row: {
        flexDirection:'row',
        justifyContent: 'center',
    },
    subText: {
        color: '#894AFF'
    }



});

export default Login;