import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import OrderHistory from '../Screens/OrderHistory';
import Profile from '../Screens/Profile';


const Tab = createBottomTabNavigator();


const Tabs = () => {

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: true,
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: '#444',
            tabBarIcon: ({focused, color, size}) => {
                let iconName = "";
                if (route.name == "Order History") { iconName = focused ? "list-circle" : "list-circle-outline" }
                else if (route.name == "Profile"){ iconName = focused ? "person-circle" : "person-circle-outline" }
                return <Ionicons name={iconName} size={20} color={color}/>
            }
        })}> 

            <Tab.Screen name = "Order History" component={OrderHistory}/>
            <Tab.Screen name = "Profile" component={Profile}/> 

        </Tab.Navigator> 
    )
}

export default Tabs;