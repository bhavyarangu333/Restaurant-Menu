import {} from 'react';
import { SafeAreaView, Text, Pressable, View, StyleSheet, ScrollView } from 'react-native';





const Restaurants = () => {
    
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{flexGrow:1}} nestedScrollEnabled={true}>
                <Text style={styles.headerText}>Restaurants</Text>
            </ScrollView>
            
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 25,
        fontWeight:'bold',
        color: '#894AFF',
        marginTop: 10,
        marginHorizontal: 10

    }

});

export default Restaurants;