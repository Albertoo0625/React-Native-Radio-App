import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListItem from './src/components/ListItem';
import { MyContextProvider } from './src/context/context';

const Tab=createBottomTabNavigator();

const App = () => {
  return (
    <>
    <MyContextProvider>
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name='Stations'>
      {()=><ListItem/>}
      </Tab.Screen>
    </Tab.Navigator>
    </NavigationContainer>
    </MyContextProvider>
    </>
  )
}

const styles=StyleSheet.create({
container:{
  flex:1
}
});
export default App;
