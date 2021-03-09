import React,{useEffect, useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import RegistroDatos from './RegistroDatos';
import RegistroTienda from './RegistroTienda';
import SubirImagen from './SubirImagen';
import Confirmar from './Confirmar';
import RegistroExitoso from './RegistroExitoso';

const Registro = ({navigation})=>{
    
    const [datos, setDatos] = useState({
        "nombre": "",
        "apellido": "",
        "contraseña": "",
        "repetirContraseña": "",
        "telefono": "",
        "universidad": "",
        "nombre_tienda": "",
        "horario": "",
        "imagen_url": "",
        "tipo_tienda": "",
        "tarjeta": ""
    })
  

    return(
    <React.Fragment>
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
      name="Exito"
      component={RegistroExitoso}
      options={{ title: "Exito" }}
    />
    </React.Fragment>
    )
}
export default Registro;