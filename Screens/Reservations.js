import {useCallback, useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {SafeAreaView, View, FlatList, StyleSheet, Text} from 'react-native';
import { getReservations } from '../BackendAPI/Read_Write_UserOrders';
import { auth } from '../firebase';



const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    
    useFocusEffect(
        useCallback(() => {
            getReservations(auth.currentUser.uid)
                .then((res) => {
                    setReservations(res);
                });

        },[])
    );

    const RenderReservationsList = ({date, time, name, location}) => {
        
        return (
            <View style={styles.reservationsContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.RestaurantTitle}>{name}</Text>
                </View>
                <Text>{location}</Text>
                <View style={{flexDirection:'row'}}>
                    <Text>Date: </Text>
                    <Text>{date}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text>Time: </Text>
                    <Text>{time}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={reservations}
                renderItem={({item}) => <RenderReservationsList date={item['date']} time={item['time']} name={item['restaurantName']} location={item['location']}/>}
            />
            
        </SafeAreaView>

    );
};


const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    reservationsContainer: {
        marginHorizontal: 10,
        marginTop: 10,
        
    },

    titleContainer: {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#CED0CE',
        marginBottom:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    RestaurantTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },

});


export default Reservations;