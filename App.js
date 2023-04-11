import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OrderHistory from './Screens/OrderHistory';
import { getOrders } from './BackendAPI/Read_Write_UserOrders';
import Tabs from './Navigation/TabBars';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (

    <NavigationContainer> 
      <Tabs/> 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
