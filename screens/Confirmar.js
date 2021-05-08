import React, {useState, useContext} from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Alert, ActivityIndicator, ScrollView } from 'react-native';
import {RegistroContext} from '../RegistroContext';
import * as firebase from 'firebase';


const Confirmar = ({navigation})=>{
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
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          openButton: {
            backgroundColor: '#F194FF',
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          },
          textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
          },
      });
      const {datos} = useContext(RegistroContext)
      const [modalText, setModalText] = useState("")
      const [isLoading, setIsLoading] = useState(false)
      const [isDisabled, setIsDisabled] = useState(false)
      const tiposDeTienda = {
          "1": "Cooperativa",
          "2": "Puesto",
          "3": "Cafeteria"
      } 
      const [modalVisible, setModalVisible] = useState(false);

      const uploadImageTienda = async ()=>{
        setIsDisabled(true)
        setIsLoading(true);
        setModalVisible(true);
        const response = await fetch(datos.uri);
        const blob = await response.blob();
        var uploadTask =  firebase.storage().ref().child("images/" + datos.nombre_tienda).put(blob)
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log('Upload is ' + progress + '% done');
            setModalText("Espera un momento porfavor... "+progress+"%")

            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(async(downloadURL) => {
            console.log('File available at', downloadURL);
            const body = datos;
            body.url_imagen = downloadURL;
        console.log(body)
        const response = await fetch("http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/tiendas",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        const responseBody = await response.json();
        console.log(responseBody)
        if(response.status==400){
            setModalVisible(true)
            console.log(responseBody)
            setModalText("Ocurrió un error: "+responseBody.error)
            setIsLoading(false);
            setIsDisabled(false)
        }else{
            setIsLoading(false);
            setModalText("");
            setModalVisible(false)
            navigation.navigate('Exito', responseBody)
        }
            });
        
      }
        )
}
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.titleText}>Confirmar datos</Text>


            <Text style={styles.label}>
                Nombre: 
            </Text>
            <Text style={styles.basicText}>
                {datos.nombre} 
            </Text>

            <Text style={styles.label}>
            Apellido:
        </Text>
        <Text style={styles.basicText}>
            {datos.apellidos}
        </Text>

        <Text style={styles.label}>
            Correo:
        </Text>
        <Text style={styles.basicText}>
            {datos.email}
        </Text>

        <Text style={styles.label}>
            Universidad:
        </Text>
        <Text style={styles.basicText}>
            {datos.nombre_universidad}
        </Text>

        <Text style={styles.label}>
            Nombre de la Tienda:
        </Text>
        <Text style={styles.basicText}>
           {datos.nombre_tienda}
        </Text>
        <Text style={styles.label}>
            Tipo de tienda:
        </Text>
        <Text style={styles.basicText}>
            {tiposDeTienda[datos.tipo_tienda]}           
        </Text>
        <Text style={styles.label}>
            Horario:
        </Text>
        <Text style={styles.basicText}>
           {datos.horario}
        </Text>
        <Text style={styles.label}>
            Aceptan tarjeta: 
        </Text>
        <Text style={styles.basicText}>
            {datos.tarjeta == "true" ? "Si" : "No"}
        </Text>


            <TouchableOpacity onPress={() =>
        navigation.navigate('SubirImagen')} disabled={isDisabled} style={styles.button} >
        <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Anterior
        </Text>
        </TouchableOpacity>

        <TouchableOpacity text="Siguiente" disabled={isDisabled} onPress={()=>uploadImageTienda()} style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Confirmar
            </Text>
        </TouchableOpacity>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalText}</Text>
            {isLoading && <ActivityIndicator color="red" size="large" /> }
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
        </ScrollView>
    )
}
export default Confirmar;