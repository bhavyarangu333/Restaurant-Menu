import { useEffect, useState } from 'react';
import { SafeAreaView, Text, Pressable, View, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { fetchPhotos } from '../BackendAPI/Geocode';





const Restaurants = () => {
    
    const [photoURI, setPhotoURI] = useState('');

    useEffect(() => {
        fetchPhotos()
        .then((res) => {
            //console.log(res);
            setPhotoURI(res.result)
            //console.log(photoURI)
        })

    }, [])
    
    return (
        <SafeAreaView style={styles.container}>

            <ScrollView contentContainerStyle={{flexGrow:1}} nestedScrollEnabled={true}>

                <Text style={styles.headerText}>Restaurants</Text>
                <Text style={styles.subHeaders}>Chinese</Text>
                <Text style={styles.subHeaders}>Mexican</Text>
                <Text style={styles.subHeaders}>Indian</Text>
                <Text style={styles.subHeaders}>Fast Food</Text>
                <View style={{height: 200, width:200, marginHorizontal: 10, backgroundColor:'blue'}}>
                    <Image source={{uri: photoURI}} style={{flex:1, resizeMode:'contain'}}/>
                </View>

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