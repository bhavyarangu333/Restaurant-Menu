import {} from 'react';
import { SafeAreaView, Text, Pressable, View, StyleSheet, ScrollView, FlatList } from 'react-native';





const Restaurants = () => {
    
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{flexGrow:1}} nestedScrollEnabled={true}>
                
                <Text style={styles.headerText}>Restaurants</Text>
                <Text style={styles.subHeaders}>Chinese</Text>
                <Text style={styles.subHeaders}>Mexican</Text>
                <Text style={styles.subHeaders}>Indian</Text>
                <Text style={styles.subHeaders}>Fast Food</Text>

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
        marginHorizontal: 10,
        marginBottom: 20
    },
    subHeaders: {
        fontSize: 20,
        fontWeight:'bold',
        color: '#894AFF',
        marginTop: 10,
        marginHorizontal: 10,
    }

});

export default Restaurants;