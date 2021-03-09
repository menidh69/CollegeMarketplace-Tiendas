import React, {useState, useContext} from 'react';
import { useEffect } from 'react';
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native';
import {RegistroContext} from '../RegistroContext';
import {Picker} from '@react-native-picker/picker';


const RegistroTienda = ({navigation, route})=>{
  const [items, setItems] = useState([]);
    useEffect(()=>{
      let isMounted = true;
      fetchitems()
      .then(response=>{
        if(isMounted){
          setItems(response)
        }
      })
     return ()=>isMounted=false
    }, [])

    const fetchitems =async()=>{
      const datos = await fetch('http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/universidades');
      const universidades =  await datos.json();
      console.log(universidades)
      return universidades;
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
        pickerInput:{    
          backgroundColor: "#FFFFFF",
          height: 25,   
          borderColor: 'gray', 
          borderWidth: 1,



      },
        inputPicker:{    
          backgroundColor: "#FFFFFF",
          height: 40,   
          borderColor: 'gray', 
          borderWidth: 1,
          borderRadius: 15,
          padding: 5

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
      const {datos, onChangeText, setDatos} = useContext(RegistroContext)


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
            Nombre de la Tienda*:
        </Text>
        <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "nombre_tienda")}
        value={datos.nombre_tienda}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Tipo de tienda:
        </Text>
      <View style={styles.inputPicker}>
      <Picker
          selectedValue={datos.tipo_tienda}
          style={styles.pickerInput}
          onValueChange={(itemValue, itemIndex) =>
            setDatos({...datos, "tipo_tienda": itemValue})
          }>
          <Picker.Item label={"Cafetería"} value={"1"} />
          <Picker.Item label={"Cooperativa"} value={"2"} />
          <Picker.Item label={"Puesto"} value={"3"} />
        
      </Picker>
      </View>
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            Horario*:
        </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text, "horario")}
        value={datos.horario}
      />
      </View>

      <View style={styles.inputView}>
       <Text style={styles.label}>
            ¿Aceptan tarjeta?
        </Text>
      <View style={styles.inputPicker}>
      <Picker
          selectedValue={datos.tarjeta}
          style={styles.pickerInput}
          onValueChange={(itemValue, itemIndex) =>
            setDatos({...datos, "tarjeta": itemValue})
          }>
       
          <Picker.Item label={"Si"} value={"true"} />
          <Picker.Item label={"No"} value={"false"} />
        
      </Picker>
      </View>

      </View>
      <View style={styles.inputView}>
       <Text style={styles.label}>
            Universidad*:
        </Text>
        <View style={styles.inputPicker}>
        <Picker
          selectedValue={datos.id_universidad}
          style={styles.pickerInput}
          onValueChange={(itemValue, itemIndex) =>
            setDatos({...datos, "id_universidad": itemValue, "nombre_universidad": items[itemIndex].nombre})

          }>
        {items.map(item=>(
          <Picker.Item label={item.nombre} value={item.id} />
        )
        )}
        
      </Picker>
      </View>
      
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