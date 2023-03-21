import React, { Component, useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable } from 'react-native';
import { getOrders } from '../BackendAPI/Read_Write_UserOrders';
import Ionicon from '@expo/vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native';




const RenderOrders = ({RestaurantName, OrderDate, OrderItems, TotalCost}) => {

    return(
        <View>
            <View style = {styles.orderContainer}> 

                <View style={styles.titleContainer}> 
                    <Text style={styles.RestaurantTitle}>
                        {RestaurantName}
                    </Text>
                    <Ionicon name = "arrow-forward-circle" size={20} style={{alignSelf:'center'}}/>
                </View>
                
                <View style={styles.orderDetailsContainer}> 

                    <Text style={styles.orderDetailsFont}>
                        {OrderDate} 
                    </Text>

                    <View  
                        style={styles.dotSeparator}
                    />

                    <Text style={styles.orderDetailsFont}>${TotalCost}</Text>

                    <View  
                        style={styles.dotSeparator}
                    />

                    <Text style={styles.orderDetailsFont}>
                         {OrderItems.length} items 
                    </Text>

                </View>

                 {
                    OrderItems.map((item) => {
                        return <Text style={styles.itemOrderContainer}>{item}</Text>
                    })
                } 
                
                <View style={{flexDirection:'row', marginBottom: 10}}>

                    <View style={{height:20, width:100, backgroundColor:'lightgrey', borderRadius:10, justifyContent:'center'}}> 
                        <Pressable style={{width:'100%', alignItems:'center'}} onPress={() =>console.log("Receipt button pressed.")}>
                            <Text style={{fontWeight:'bold',fontSize:12}}>
                                View Receipt 
                            </Text>
                        </Pressable>
                    </View>

                    <View style={{height:20, width:100, backgroundColor:'lightgrey', borderRadius:10, justifyContent:'center', marginLeft:10}}> 
                        <Pressable style={{width:'100%', alignItems:'center'}} onPress={() =>console.log("Reorder button pressed.")}>
                            <Text style={{fontWeight:'bold',fontSize:12}}>
                                Reorder
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </View>

            <View style={styles.listSeparator}/>
        </View>


    )
}

const OrderHistory = (props) => {
    
    const [userOrders, setUserOrders] = useState([]);

   
    useFocusEffect(
        React.useCallback(() => {
            getOrders().then(result => {setUserOrders(result)})
    
            return () => {console.log("Unfocused here. ")};
            },[])
    );

    return (

        <SafeAreaView style = {styles.container}> 
                <FlatList
                    data={userOrders} 
                    renderItem={({item}) =>  <RenderOrders RestaurantName={item["Restaurant"]} OrderDate={item["Order_Date"].toDate().toDateString()} OrderItems={item["Orders"]} TotalCost={item["Total_Price"]}/> }
                    keyExtractor={item => item["id"]}
                />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor:'white',
        width: "100%"
    },

    RestaurantTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    orderContainer: {
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
        
    },
    titleContainer: {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#CED0CE',
        marginBottom:5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    orderDetailsContainer: {
        flexDirection: 'row',
        marginBottom:5
    },
    orderDetailsFont:{
        fontSize:11,
    },
    dotSeparator:{
        borderWith: StyleSheet.hairlineWidth,
        width:3,
        height:3,
        borderRadius:1.5,
        backgroundColor:'black',
        alignSelf:'center',
        marginLeft:5,
        marginRight:5
    },
    listSeparator: {
        borderBottomWidth:10,
        borderBottomColor:'#DCDCDC'
    },
    itemOrderContainer: {
        marginBottom: 10,
    }
    


})


export default OrderHistory;