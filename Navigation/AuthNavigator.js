import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './TabBars'


const Stack = createStackNavigator();

const AuthNavigator = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Tabs}/>
        </Stack.Navigator>
    )
}


export default AuthNavigator;