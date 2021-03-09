import React,{useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import RegistroDatos from './RegistroDatos';
import RegistroTienda from './RegistroTienda';
import SubirImagen from './SubirImagen';
import Confirmar from './Confirmar';
const RegistroStack = createStackNavigator();
import {RegistroContext} from '../RegistroContext';
import RegistroExitoso from './RegistroExitoso';

const Registro = ()=>{
    
    const [datos, setDatos] = useState({
        "nombre": "",
        "apellidos": "",
        "contraseña": "",
        "repetirContraseña": "",
        "telefono": "",
        "email": "",
        "id_universidad": "",
        "nombre_universidad": "",
        "nombre_tienda": "",
        "horario": "",
        "url_imagen": "",
        "tipo_tienda": "",
        "tarjeta": "false"
    })
    const onChangeText = (text, form)=>{
        console.log(text + form)
        switch(form){
            case "nombre":
                setDatos({...datos, "nombre": text})
                console.log(text + form)
                return
            case "apellido":
                setDatos({...datos, "apellido": text})
                return
                case "correo":
                    setDatos({...datos, "correo": text})
                    return
            case "contraseña":
                setDatos({...datos, "contraseña": text})
                return
            case "repetirContraseña":
                setDatos({...datos, "repetirContraseña": text})
                return
            case "telefono":
                setDatos({...datos, "telefono": text})
                return
            case "universidad":
                setDatos({...datos, "universidad": text})
                return
            case "nombre_tienda":
                setDatos({...datos, "nombre_tienda": text})
                return
            case "horario":
                setDatos({...datos, "horario": text})
                return
            case "imagen_url":
                setDatos({...datos, "imagen_url": text})
                return
            case "tipo_tienda":
                setDatos({...datos, "tipo_tienda": text})
                return
            case "tarjeta":
                setDatos({...datos, "tarjeta": text})
                return
        }
        
    }
  
    
    return(
    <RegistroContext.Provider value={{datos, onChangeText, setDatos}}>
    <RegistroStack.Navigator>
  
    <RegistroStack.Screen
      name="RegistroDatos"
      component={RegistroDatos}
      options={{ title: "Sign Up"}}
    />
     <RegistroStack.Screen
      name="RegistroTienda"
      component={RegistroTienda}
      options={{ title: "Sign Up"}}
    />
     <RegistroStack.Screen
      name="SubirImagen"
      component={SubirImagen}
      options={{ title: "Sube tu foto" }}
    />
    <RegistroStack.Screen
      name="Confirmar"
      component={Confirmar}
      options={{ title: "Confirmar" }}
    />
    <RegistroStack.Screen
      name="Exito"
      component={RegistroExitoso}
      options={{ title: "Exito" }}
    />
    </RegistroStack.Navigator>
    </RegistroContext.Provider>    
    )
}
export default Registro;