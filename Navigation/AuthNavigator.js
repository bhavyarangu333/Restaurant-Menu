import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './TabBars';
import Login from '../Screens/LogIn';
import OnboardingScreen from '../Screens/BoardingScreen';
import SignUp from '../Screens/SignUp';

const Stack = createStackNavigator();

const AuthNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Onboarding'>
            <Stack.Screen name = 'Onboarding' component={OnboardingScreen}/>
            <Stack.Screen name = 'Sign Up' component={SignUp}/>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}


export default AuthNavigator;