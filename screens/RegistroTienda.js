import React, {useState} from 'react';
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native';


const RegistroTienda = ({navigation})=>{
    const [datos, setDatos] = useState({
        "nombre": "",
        "apellido": "",
        "contraseña": "",
        "repetirContraseña": "",
        "telefono": "",
        "universidad": ""
    })

    const onChangeText = (text, form)=>{
        switch(form){
            case "nombre":
                setDatos({...datos, "nombre": text})
                return
            case " apellido":
                setDatos({...datos, "apellido": text})
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
        }
        
    }

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
            backgroundColor: "#B1D8EE",
            flex: 1,
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
        }
      });

    return(
        <View style={styles.container}>
        <Text style={styles.titleText}>
            Crea tu Tienda
        </Text>
        <Text style={styles.basicText}>
            Introduce la información básica de tu tienda.
        </Text>

        <View style={styles.inputView}>
        <Text style={styles.label}>
            Nombre de la Tienda:
        </Text>
        <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "nombre")}
        value={datos.nombre}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Selecciona el tipo de tienda:
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "apellido")}
        value={datos.apellido}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Horario:
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "contraseña")}
        value={datos.contraseña}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            ¿Aceptan tarjeta?
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "repetirContraseña")}
        value={datos.repetirContraseña}
      />
      </View>

      

      <TouchableOpacity text="Siguiente" onPress={() =>
        navigation.navigate('RegistroDatos')} style={styles.button} >
        <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Anterior
        </Text>
        </TouchableOpacity>

        <TouchableOpacity text="Siguiente" onPress={() =>
        navigation.navigate('SubirImagen')} style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Siguiente
            </Text>
        </TouchableOpacity>
      </View>
    )


}

export default RegistroTienda;