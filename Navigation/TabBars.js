import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import OrderHistory from '../Screens/OrderHistory';
import AccountNavigation from './AccountNavigation';
import Maps from '../Screens/Maps';
import RestaurantNavigator from './RestaurantNavigation';
import OrderCart from '../Screens/OrderCart';


const Tab = createBottomTabNavigator();

function Tabs(){

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarActiveTintColor: '#894AFF',
            tabBarInactiveTintColor: '#894AFF',
            tabBarIcon: ({focused, color, size}) => {
                let iconName = "";
                if (route.name == "Order History") { iconName = focused ? "list-circle" : "list-circle-outline" }
                else if (route.name == "RestaurantsNav"){ iconName = focused ? "restaurant" : "restaurant-outline" }
                else if (route.name == "Map"){ iconName = focused ? "map" : "map-outline" }
                else if (route.name == "Settings"){ iconName = focused ? "person-circle" : "person-circle-outline" }
                return <Ionicons name={iconName} size={20} color={color}/>
            }
        })}> 
            <Tab.Screen name = "RestaurantsNav" component={RestaurantNavigator} options={{tabBarLabel:'Restaurants'}}/>
            <Tab.Screen name = "Map" component={Maps}/>
            <Tab.Screen name = "Order History" component={OrderHistory} options={{headerShown:true}}/>
            <Tab.Screen name = "Settings" component={AccountNavigation}/>

        </Tab.Navigator> 
    )
}

export default Tabs;