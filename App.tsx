import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {PaperProvider} from 'react-native-paper';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import StockInScreen from './components/screens/StockInScreen';
import StockOutScreen from './components/screens/StockOutScreen';

const Stack = createNativeStackNavigator();

export default function App(props: any) {
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="StockInScreen"
              component={StockInScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="StockOutScreen"
              component={StockOutScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  );
}
