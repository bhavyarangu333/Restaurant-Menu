import { createStackNavigator } from '@react-navigation/stack';
import Payment from '../Screens/Payment';
import Account from '../Screens/Account'

const Stack = createStackNavigator();

const AccountNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:true}} initialRouteName='Account'>
            <Stack.Screen name='Account' component={Account}/>     
            <Stack.Screen name='Manage Payment' component={Payment}/>

        </Stack.Navigator>
    )
}


export default AccountNavigator;