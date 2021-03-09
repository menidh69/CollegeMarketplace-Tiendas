import React, {useState, useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {RegistroContext} from '../RegistroContext';


const RegistroExitoso = ({navigation})=>{
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
            textAlign:"left",
            marginBottom: 10
        },
        input:{    
            backgroundColor: "#FFFFFF",
            height: 40,   
            borderColor: 'gray', 
            borderWidth: 1,
            borderRadius: 15,
            padding: 5,
            paddingLeft: 20,

        },
        container:{
            padding: 30,
            backgroundColor: "#B1D8EE",
            flex: 1,
        },
        inputView:{
            marginTop: 5,
            marginBottom:5
        },
        label:{
            fontSize: 14
        },
        button:{
            borderRadius: 20,
            backgroundColor: "#E99125",
            height: 40,
            color: "#FFFFFF",
            marginTop: 30,
            textAlign: 'center',
            paddingTop: 5
        }
      });
      const {datos} = useContext(RegistroContext)
      const tiposDeTienda = {
          "1": "Cooperativa",
          "2": "Cafeteria",
          "3": "Puesto"
      }
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Registro Exitoso!</Text>


  
        <TouchableOpacity text="Siguiente"  style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Continuar
            </Text>
        </TouchableOpacity>
        </View>
    )
}
export default RegistroExitoso;