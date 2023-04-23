import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './TabBars';
import Login from '../Screens/LogIn';
import OnboardingScreen from '../Screens/BoardingScreen';
import NewAuth from '../Screens/NewAuth';

const Stack = createStackNavigator();

const AuthNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Onboarding'>
            <Stack.Screen name = 'Onboarding' component={OnboardingScreen}/>
            <Stack.Screen name ='Login' component={Login} options={{headerShown:true, headerBackTitleVisible:false}}/>
            <Stack.Screen name = 'New user' component={NewAuth} options={{headerShown:true, title:'Create Credentials', headerBackTitleVisible:false}}/>
            <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}


export default AuthNavigator;