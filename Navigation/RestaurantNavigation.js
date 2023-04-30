import { createStackNavigator } from '@react-navigation/stack';
import RestaurantMenu from '../Screens/RestaurantMenu';
import Restaurants from '../Screens/Restaurants';
import OrderCart from '../Screens/OrderCart';
import Ionicons from '@expo/vector-icons/Ionicons';
import DeliveryScreen from '../Screens/DeliveryScreen';


const Stack = createStackNavigator();

const RestaurantNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:false, headerBackTitleVisible:false}} initialRouteName='Restaurants'>
            <Stack.Screen name='Restaurants' component={Restaurants}/>
            <Stack.Screen name='RestaurantMenu' component={RestaurantMenu} options={({navigation}) => ({headerShown:'true', headerRight: () => <Ionicons style={{marginRight:15}} name='cart' size={25}/>})}/>
            <Stack.Screen name='Cart' component={OrderCart} options={{headerShown:'true'}}/>
            <Stack.Screen name='Delivery' component={DeliveryScreen}/>
        </Stack.Navigator>
    )
};


export default RestaurantNavigator;