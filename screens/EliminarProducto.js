import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from '../NewUserContext';
import { TiendaContext } from '../TiendaContext';
import { useForm } from 'react-hook-form';

const EliminarProducto = ({ route }) => {

    const { tienda, setTienda } = useContext(TiendaContext);

    const navigation = useNavigation();

    const onSubmit = async () => {
        try {
            const response = await fetch(`http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/eliminarProducto/${route.params.producto.id}/${tienda.id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
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
    };


    

    return (
        <View style={styles.container}>
            
            <Text style={styles.titulo}>¿Estas seguro que deseas borrar el siguiente producto?</Text>
            
            <View style={styles.image}></View>

            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.texto}>{ route.params.producto.nombre }</Text>

            <Text style={styles.label}>Precio:</Text>
            <Text style={styles.texto}>${Number.parseFloat(route.params.producto.precio).toFixed(2)}</Text>
            

            <Text style={styles.label}>Categoría:</Text>
            <Text style={styles.texto}>{ route.params.producto.categoria }</Text>
            

            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.texto}>{ route.params.producto.descripcion }</Text>
            

            <TouchableOpacity style={styles.eliminarBtn} onPress={()  => onSubmit()}>
                <Text style={styles.eliminarText}>Eliminar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelarBtn} >
                <Text style={styles.cancelarText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C0D5E1',
        flex: 1,
        alignItems: 'center',
    },
    eliminarBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#bf4d4d",
        marginTop: 20,
        width: "50%"
    },
    eliminarText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    label: {
        fontSize: 18
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 25,
        backgroundColor: 'white',
        marginBottom: 30
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        marginTop: 50
    },
    cancelarBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C0D5E1",
        marginTop: 20,
    },
    cancelarText: {
        fontWeight: 'bold',
        color: '#000'
    },
});

export default EliminarProducto;