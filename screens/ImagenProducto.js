import React, {useState, useEffect, useContext} from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Platform, ActivityIndicator, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {ProductoContext} from '../ProductoContext';

const SubirImagen = ({navigation})=>{
    
    const [image, setImage] = useState(null);
    const {datos, setDatos, onSubmit} = useContext(ProductoContext)

    const [showModal, setShowModal] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false)

    const handleSave = ()=>{
        setShowModal(true);
        setIsDisabled(true);
        onSubmit();
    }
 
    console.log(datos)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
  
      
        // setDatos({...datos, "url_imagen": url})
        setDatos({...datos, "uri": result.uri})
        setImage(result.uri);
        // console.log(url)  
    }
  };
    
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
        placeholder:{
            width: "100%", 
            height: 240,
            alignContent: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "black",
            textAlign: "center",
            marginBottom: 20
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
        },
        upload:{
            backgroundColor: "#4267B2",
            height: 40,
            paddingTop: 5,
            borderRadius: 20,
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
            fontSize:20
          },
          spinner:{
            marginBottom: 15,
          }
      });

    return(
        <View style={styles.container}>
        <Text style={styles.titleText}>
            Sube la imagen de tu producto
        </Text>
        <View style={styles.placeholder}>
                {image && <Image source={{ uri: datos.uri }} style={{ width: 320, height: 240}} />}
        </View>
        <View style={styles.inputView}>
            <TouchableOpacity style={styles.upload} onPress={pickImage}>
                
                <Text style={{"textAlign": "center", "color": "white", fontSize: 18}}>Subir imagen de galería</Text>
            </TouchableOpacity>
            
           
      
        
        </View>
      
     

      <TouchableOpacity text="Siguiente" disabled={isDisabled} onPress={() =>
        navigation.navigate('AgregarProducto')} style={styles.button}>
        <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Anterior
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSave()} disabled={isDisabled} text="Siguiente" style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Guardar
            </Text>
        </TouchableOpacity>
        <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
                Guardando tu producto...<Text style={{fontSize:30}}>
                😋
                </Text>
                </Text>
                
            <ActivityIndicator style={styles.spinner} color="red" size="large" /> 
           
          </View>
        </View>
      </Modal>
      </View>
    )


}

export default SubirImagen;