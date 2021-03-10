import React, {useState, useContext} from 'react';
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native';
import {RegistroContext} from '../RegistroContext';
import {emailValidation, isEmptyNull, repeatPassword} from '../validation/formValidation';
import ErrorModal from '../components/ErrorModal';

const RegistroDatos = ({navigation, route})=>{
  const {datos, onChangeText} = useContext(RegistroContext)
  const [showmodal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
    const handleNext = ()=>{
      if(isEmptyNull(datos.nombre)||isEmptyNull(datos.apellidos)||isEmptyNull(datos.email)||isEmptyNull(datos.contraseña)
      ||isEmptyNull(datos.repetirContraseña)||isEmptyNull(datos.telefono)){
        setShowModal(true);
        setModalMessage("Debes llenar todos los campos")
        return
      }
      if(!emailValidation(datos.email)){
        setModalMessage("El formato de tu correo es incorrecto")
        setShowModal(true);
        return
      }
      if(!repeatPassword(datos.contraseña, datos.repetirContraseña)){
        setShowModal(true);
        setModalMessage("Tus contraseñas no coinciden")
        return
      }
      return navigation.navigate('RegistroTienda', )
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
            Crea tu cuenta
        </Text>
        <Text style={styles.basicText}>
            Introduce tus datos para registrarte. Ya tienes una cuenta?
        </Text>

        <View style={styles.inputView}>
        <Text style={styles.label}>
            Nombre*:
        </Text>
        <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "nombre")}
        value={datos.nombre}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Apellidos*:
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "apellidos")}
        value={datos.apellidos}
      />
      </View>
      <View style={styles.inputView}>
       <Text style={styles.label}>
            Correo*:
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "email")}
        value={datos.email}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Contraseña*:
        </Text>
      <TextInput secureTextEntry={true}
        style={styles.input}
        onChangeText={text => onChangeText(text, "contraseña")}
        value={datos.contraseña}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Repetir Contraseña*:
        </Text>
      <TextInput
      secureTextEntry={true}
        style={styles.input}
        onChangeText={text => onChangeText(text, "repetirContraseña")}
        value={datos.repetirContraseña}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Telefono*:
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "telefono")}
        value={datos.telefono}
      />
      </View>
      
      <TouchableOpacity onPress={() =>
        handleNext()
      }
      text="Siguiente" style={styles.button}>
      <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
            Siguiente
        </Text>
          </TouchableOpacity>
          <ErrorModal setShow={setShowModal} show={showmodal} message={modalMessage}></ErrorModal>
      </View>
    )


}

export default RegistroDatos;