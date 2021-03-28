import React,{useEffect, useState, useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const ProductoStack = createStackNavigator();
import {ProductoContext} from '../ProductoContext';
import ImagenProducto from './ImagenProducto';
import AgregarProducto from './AgregarProducto';
import * as firebase from 'firebase';
import {TiendaContext} from '../TiendaContext';



const RegistroProducto = ({navigation})=>{
    const { tienda, setTienda } = useContext(TiendaContext);
    const [datos, setDatos] = useState({
        "id_tienda": tienda.id,
        'nombre': "",
        'precio': "",
        'categoria': "",
        'url_imagen': "",
        'descripcion': "",
        'uri': ""
    });
    const onSubmit = async () => {
        const response = await fetch(datos.uri);
        const blob = await response.blob();
        var uploadTask =  firebase.storage().ref().child("producto/" + datos.id_tienda+"-"+datos.nombre).put(blob)
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            console.log('Upload is ' + progress + '% done');
            

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
        try {
            datos.id_tienda = tienda.id;
            const body = datos;
            body.url_imagen = downloadURL;
            const response = await fetch('http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/nuevoProducto',
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                .then(async resp => {
                    const result = await resp.json()
                    if (result.error) {
                        console.log(result.error)
                    } else {
                        console.log(result)
                        navigation.reset({
                            routes: [{ name: 'Productos' }]
                        });
                    }
                })
        } catch (err) {
            console.log(err)
        }
    })})
    };

    

    return(
    <ProductoContext.Provider value={{datos, setDatos, onSubmit}}>
    <ProductoStack.Navigator>
  
    <ProductoStack.Screen
      name="AgregarProducto"
      component={AgregarProducto}
      options={{ 
          title: 'Agrega un nuevo producto',
            headerStyle: {
                backgroundColor: '#C0D5E1',
                shadowOffset: {
                    height: 0
                }
            },}}
    />

    
     <ProductoStack.Screen
      name="ImagenProducto"
      component={ImagenProducto}
      options={{ 
        title: 'Agrega una imagen',
          headerStyle: {
              backgroundColor: '#C0D5E1',
              shadowOffset: {
                  height: 0
              }
          },}}
    />
     
    </ProductoStack.Navigator>
    </ProductoContext.Provider>    
    )
}
export default RegistroProducto;