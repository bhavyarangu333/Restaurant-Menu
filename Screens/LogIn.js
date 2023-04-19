import {useState} from 'react';
import { View, SafeAreaView, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';



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
                        autoComplete='false'
                        onChangeText={text => setEmail(text)}
                    />

                    <TextInput placeholder='Password'
                        style={styles.input} 
                        autoCapitalize='none' 
                        autoComplete='false'
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                    />                

                    <Pressable onPress={() => navigation.navigate('Home')} style={styles.button}>
                        <Text style={{color:'white'}}>Log In</Text>
                    </Pressable>

                

    

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
        backgroundColor: 'purple',
        borderRadius: 8,
        borderWidth: 1,
        width: '90%',
        justifyContent:'center',
        alignItems: 'center'

    },

    title: {
        fontWeight:'bold',
        fontSize: 36,
        color:'purple',
        alignSelf:'center',
        bottom: 50  
    }



});

export default Login;