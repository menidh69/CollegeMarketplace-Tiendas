import React, {useState, useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {RegistroContext} from '../RegistroContext';
import { faCoffee, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {NewUserContext} from '../NewUserContext'
import {TiendaContext} from '../TiendaContext'

const RegistroExitoso = ({route, navigation})=>{
    const styles = StyleSheet.create({
        baseText: {
          fontFamily: "Cochin"
        },
        titleText: {
          fontSize: 32,
          fontWeight: "bold",
          textAlign:"left",
          marginBottom: 20,

        },
        basicText:{           
            fontSize: 20,
            fontWeight: "300",
            textAlign:"center",
            marginBottom: 10
        },

        container:{
            padding: 30,
            backgroundColor: "#B1D8EE",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
       
        button:{
            borderRadius: 20,
            backgroundColor: "#E99125",
            height: 40,
            color: "#FFFFFF",
            marginTop: 30,
            textAlign: 'center',
            paddingTop: 5,
            paddingHorizontal: 60
        }
      });
      const {tienda, setTienda} = useContext(TiendaContext)
      const {datos} = useContext(RegistroContext)
      const tiposDeTienda = {
          "1": "Cooperativa",
          "2": "Cafeteria",
          "3": "Puesto"
      }
      const infoTienda = route.params.tienda

      const {user, setUser} = useContext(NewUserContext)

      const handleTerminar = ()=>{
          //Generar JWT
          //Pendiente.....
          //------------------
        //   setUser({
        //     "nombre": datos.nombre, 
        //     "apellidos": datos.apellidos, 
        //     "email": datos.email,
        //     "telefono": datos.telefono,
        //     "universidad": datos.nombre_universidad
        // })
        // setTienda({
        //     "nombre_tienda": infoTienda.nombre_tienda,
        //     "horario": infoTienda.horario,
        //     "url_imagen": infoTienda.url_imagen,
        //     "id": "",
        // })
        navigation.reset({
            routes: [{ name: 'Landing' }]
        })
      };

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>¡ Exito !</Text>
        <FontAwesomeIcon icon={faCheckCircle} size={128} style={{marginBottom: 20}}></FontAwesomeIcon>
        <Text style={styles.basicText}>
            Te has registrado exitosamente como una tienda.
        </Text>
  
        <TouchableOpacity text="Siguiente"  onPress={()=>handleTerminar()} style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Continuar
            </Text>
        </TouchableOpacity>
        </View>
    )
}
export default RegistroExitoso;