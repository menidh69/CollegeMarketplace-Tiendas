
import React, {useState} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Registro from './screens/Registro';
import Landing from './screens/Landing';
import Login from './screens/login';
import Home from './screens/Home'

export default function App() {
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    switch (routeName) {
        case 'Home':
            return 'Hola';
        case 'Cuenta':
            return 'Mi Cuenta';
        case 'Carrito':
            return 'Mi Carrito';
        case 'Pedidos':
            return 'Mis pedidos';
        case 'Buscar':
            return 'Buscar';
    }
}
  return (
    <NavigationContainer>
    <Stack.Navigator>

    <Stack.Screen 
          name="Landing" 
          component={Landing}
          options={{headerShown: false}}
           />
    <Stack.Screen
        name="Login"
        component={Login}
        options={
            {
                title: 'Log In',
                headerBackTitle: 'Atrás',
                
                headerTintColor: '#000',
                headerStyle: {
                    backgroundColor: '#C0D5E1'
                },
                shadowOffset: {
                    height: 0
                }
            }
        }
    /> 
    <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ title: "Sign Up", headerShown: false}}
        />

    <Stack.Screen
          name="Home"
          component={Home}
          options={{title: "Home", headerLeft: null}}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

