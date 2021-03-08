import React, {useState, useEffect} from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


const SubirImagen = ({navigation})=>{
    
    const [image, setImage] = useState(null);

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
      setImage(result.uri);
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
        }
      });

    return(
        <View style={styles.container}>
        <Text style={styles.titleText}>
            Sube tu foto
        </Text>
        <Text style={styles.basicText}>
            Sube una imagen de tu tienda para que te puedan identificar mejor
        </Text>
        <View style={styles.placeholder}>
                {image && <Image source={{ uri: image }} style={{ width: 320, height: 240, "textAlign": "center"}} />}
        </View>
        <View style={styles.inputView}>
            <TouchableOpacity style={styles.upload} onPress={pickImage}>
                
                <Text style={{"textAlign": "center", "color": "white", fontSize: 18}}>Subir imagen de galería</Text>
            </TouchableOpacity>
            
           
      
        
        </View>
      
     

      <TouchableOpacity text="Siguiente" onPress={() =>
        navigation.navigate('RegistroTienda')} style={styles.button}>
        <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Anterior
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>
        navigation.navigate('Confirmar')} text="Siguiente" style={styles.button}>
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Siguiente
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 20}} onPress={()=>navigation.navigate('Confirmar')}>
            <Text style={{"color": "blue", "textAlign": "center", "fontSize": 18}}>
                Omitir
            </Text>
        </TouchableOpacity>
      </View>
    )


}

export default SubirImagen;