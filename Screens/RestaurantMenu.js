import {} from 'react';
import { SafeAreaView, View, Text, FlatList, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const RestaurantMenu = (props) => {

    const navigation = useNavigation();
    navigation.setOptions({
        headerTitle: props.route.params.restaurantName,
      });

    return (
        <SafeAreaView style={styles.container}>
            <Text>Restaurant Menu</Text>
        </SafeAreaView>
    );

};


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    }

});


export default RestaurantMenu;