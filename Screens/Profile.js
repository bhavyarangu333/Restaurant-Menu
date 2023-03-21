import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { getOrders } from '../BackendAPI/Read_Write_UserOrders';


const Profile = () => {
    
    return (
        <View style={styles.container}> 
            <Text onPress={() => {console.log(getOrders())} } > 
                Profile Page
            </Text>
        </View> 
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    }

});

export default Profile;