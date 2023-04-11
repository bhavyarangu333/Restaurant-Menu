import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import OrderHistory from '../Screens/OrderHistory';
import AccountNavigation from './AccountNavigation'


const Tab = createBottomTabNavigator();


function Tabs(){

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: '#444',
            tabBarIcon: ({focused, color, size}) => {
                let iconName = "";
                if (route.name == "Order History") { iconName = focused ? "list-circle" : "list-circle-outline" }
                else if (route.name == "Settings"){ iconName = focused ? "person-circle" : "person-circle-outline" }
                return <Ionicons name={iconName} size={20} color={color}/>
            }
        })}> 

            <Tab.Screen name = "Order History" component={OrderHistory} screenOptions={{headerShown:true}} />
            <Tab.Screen name = "Settings" component={AccountNavigation}/> 

        </Tab.Navigator> 
    )
}

export default Tabs;