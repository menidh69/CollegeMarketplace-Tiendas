import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from '../NewUserContext';
import { TiendaContext } from '../TiendaContext';
import { useForm } from 'react-hook-form';

const AgregarProducto = () => {

    const { tienda, setTienda } = useContext(TiendaContext);

    const navigation = useNavigation();

    const onSubmit = async data => {
        try {
            data.id_tienda = tienda.id;
            const body = data;
            const response = await fetch('http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/nuevoProducto',
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
                            index: 0,
                            actions: [
                                navigation.navigate({routeName: 'Productos'})
                            ]
                        })
                    }
                })
        } catch (err) {
            console.log(err)
        }
    };


    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register('id_tienda')
        register('nombre');
        register('precio');
        register('categoria');
        register('url_imagen');
        register('descripcion');
    }, [register]);

    return (
        <View style={styles.container}>

            <Text>Nombre:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Nombre"
                    placeholderTextColor="#003f5c"
                    maxLength={20}
                    onChangeText={text => { setValue('nombre', text) }}
                    data-openpay-card="card_number"
                />
            </View>

            <Text>Precio:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Precio"
                    placeholderTextColor="#003f5c"
                    keyboardType='number-pad'
                    maxLength={6}
                    onChangeText={text => { setValue('precio', text) }}
                />
            </View>

            <Text>Categoría:</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Categoría"
                    placeholderTextColor="#003f5c"
                    maxLength={20}
                    onChangeText={text => { setValue('categoria', text) }}
                />
            </View>

            <Text>Descripción:</Text>
            <View style={styles.inputViewDescripcion}>
                <TextInput
                    style={styles.TextInputDescripcion}
                    placeholder="Descripción"
                    placeholderTextColor="#003f5c"
                    maxLength={100}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => { setValue('descripcion', text) }}
                />
            </View>

            <TouchableOpacity style={styles.guardarBtn} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.guardarText}>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C0D5E1',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        backgroundColor: "#E2DFDF",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    inputViewDescripcion: {
        backgroundColor: "#E2DFDF",
        borderRadius: 30,
        width: "70%",
        height: 100,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 10
    },
    TextInputDescripcion: {
        height: "80%",
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    guardarBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5db385",
        marginTop: 20,
        width: "50%"
    },
    guardarText: {
        fontWeight: 'bold',
        color: '#fff'
    }
});

export default AgregarProducto;