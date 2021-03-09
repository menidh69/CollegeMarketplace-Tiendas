import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import RegistroDatos from './screens/RegistroDatos';
import RegistroTienda from './screens/RegistroTienda';
import SubirImagen from './screens/SubirImagen';
import Confirmar from './screens/Confirmar'
import Registro from './screens/Registro';
import Landing from './screens/Landing';
import Pedidos from './screens/Pedidos';

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>

    <Stack.Screen 
          name="Landing" 
          component={Landing}
          options={{headerShown: false}}
           /> 
    <Stack.Screen
          name="RegistroDatos"
          component={RegistroDatos}
          options={{ title: "Sign Up"}}
        />
         <Stack.Screen
          name="RegistroTienda"
          component={RegistroTienda}
          options={{ title: "Sign Up"}}
        />
         <Stack.Screen
          name="SubirImagen"
          component={SubirImagen}
          options={{ title: "Sube tu foto" }}
        />
        <Stack.Screen
          name="Confirmar"
          component={Confirmar}
          options={{ title: "Confirmar" }}
        />

         <Stack.Screen
          name="Pedidos"
          component={Pedidos}
          options={{ title: "Pedidos" }}
        />
     
     
    </Stack.Navigator>
    </NavigationContainer>
  );
}

