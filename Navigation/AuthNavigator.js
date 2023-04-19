import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './TabBars';
import Login from '../Screens/LogIn';


const Stack = createStackNavigator();

const AuthNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Login'>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}


export default AuthNavigator;