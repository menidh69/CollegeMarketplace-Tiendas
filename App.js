
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Registro from './screens/Registro';
import Landing from './screens/Landing';
import Login from './screens/login';
import Home from './screens/Home';

import Editarinfo from './screens/Editarinfo';
import Mitienda from './screens/Mitienda';
import Productos from './screens/Productos';
import { NewUserContext } from './NewUserContext'
import { TiendaContext } from './TiendaContext'
  import * as firebase from 'firebase';
import ApiKeys from './constants/ApiKeys'
import { TiendaContext } from './TiendaContext'

export default function App() {
    const [user, setUser] = useState(null)
    const [tienda, setTienda] = useState(null)

    if(!firebase.apps.length){firebase.initializeApp(ApiKeys.FirebaseConfig)}


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
        <NewUserContext.Provider value={{ user, setUser }}>
            <TiendaContext.Provider value={{ tienda, setTienda }}>

                <NavigationContainer>
                    <Stack.Navigator>

                        <Stack.Screen
                            name="Landing"
                            component={Landing}
                            options={{ headerShown: false }}
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
                            options={{ title: "Sign Up", headerShown: false }}
                        />

                        <Stack.Screen
                            name="Home"
                            component={Home}
                            options={({ route }) => (
                                {
                                    headerShown: false,
                                    shadowOffset: {
                                        height: 0
                                    }
                                })
                            }
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </TiendaContext.Provider>
        </NewUserContext.Provider>
    );
}

