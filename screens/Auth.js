import React,{useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const AuthStack = createStackNavigator();
import Registro from './Registro';
import Landing from './Landing';
import Login from './login';

const Auth = ()=>{
    return(

    <AuthStack.Navigator>
  
  <AuthStack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
    />
    <AuthStack.Screen
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
    <AuthStack.Screen
        name="Registro"
        component={Registro}
        options={{ title: "Sign Up", headerShown: false }}
    />
    </AuthStack.Navigator>

)
}
export default Auth;