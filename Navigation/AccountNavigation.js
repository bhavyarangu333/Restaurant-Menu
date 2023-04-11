import { createStackNavigator } from '@react-navigation/stack';
import Account from '../Screens/ManageAccount';
import Payment from '../Screens/Payment';


const Stack = createStackNavigator();

const AccountNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:true}}>
            <Stack.Screen name='Manage Account' component={Account}/>
            <Stack.Screen name='Manage Payment' component={Payment}/>

        </Stack.Navigator>


        
    )
}