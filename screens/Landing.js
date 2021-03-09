import React, {useState} from 'react';
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity, Image } from 'react-native';
import Carrito from '../assets/carrito.png'

const Landing = ({navigation})=>{
    const [datos, setDatos] = useState({
        "nombre": "",
        "apellido": "",
        "contraseña": "",
        "repetirContraseña": "",
        "telefono": "",
        "universidad": ""
    })



    const styles = StyleSheet.create({

        titleText: {
          fontSize: 46,
          fontWeight: "bold",
          textAlign:"left",
          marginBottom: 30,
          marginTop:30,
          color: "white",
          textAlign: 'center'
        },
        basicText:{
            
            fontSize: 20,
            fontWeight: "300",
            textAlign:"left",
            marginBottom: 20,
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
            paddingTop: 100,
            backgroundColor: "#1E6995",
            flex: 1,
            textAlign: "center"
        },
        inputView:{
            marginTop: 5,
            marginBottom:5
        },
        label:{
            margin: 5,
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
        },
        img:{
            width:100, 
            height:100,
            alignSelf: 'center',
            margin: 30
        }
      });

    return(
        <View style={styles.container}>
        <Text style={styles.titleText}>
            College Marketplace
        </Text>
           <Image style={styles.img} source={Carrito}></Image>

      <TouchableOpacity style={styles.button} onPress={() =>
        navigation.navigate('Login')} >
        <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
              Login
        </Text>
        </TouchableOpacity>

        <TouchableOpacity text="Siguiente" onPress={() =>
        navigation.navigate('Registro', {screen:"RegistroDatos"})} style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Registrate
            </Text>
        </TouchableOpacity>
      </View>
    )


}

export default Landing;