import { createStackNavigator } from '@react-navigation/stack';
import RestaurantMenu from '../Screens/RestaurantMenu';
import Restaurants from '../Screens/Restaurants';


const Stack = createStackNavigator();

const RestaurantNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:false, headerBackTitleVisible:false}} initialRouteName='Restaurants'>
            <Stack.Screen name='Restaurants' component={Restaurants}/>
            <Stack.Screen name='RestaurantMenu' component={RestaurantMenu} options={{headerShown:'true'}}/>

        </Stack.Navigator>
    )
};


export default RestaurantNavigator;