import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TabBarIOS, Text, View, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { UserContext } from '../UserContext';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from '../NewUserContext';
import { createStackNavigator } from '@react-navigation/stack';
import { TiendaContext } from '../TiendaContext'
import RegistroProducto from './RegistroProducto'
import Food from '../assets/food.png';
import EditarProducto from './EditarProducto'
import EliminarProducto from './EliminarProducto'

const Stack = createStackNavigator();


const Ventas = () => {

    const { user, setUser } = useContext(NewUserContext);
    const { tienda, setTienda } = useContext(TiendaContext);

    const navigation = useNavigation();

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchitems();
    },[]);


    const fetchitems = async (id) => {
        const data = await fetch(`http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/miTienda/${tienda.id}`);
        const it = await data.json();
        console.log(it);
        setItems(it);
    }

    return (
        <>
            <View style={styles.productoContainer} >
                <View style={styles.imageProducto}>
                <Image style={styles.imageProducto}
                        source={{uri: tienda.url_imagen}}  
                />  
                </View>
                <View style={styles.textoProductoContainer}>
                    <Text>{tienda.nombre}</Text>
                    <Text>{tienda.horario}</Text>
                </View>
            </View>
            <View
                style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
        </>
    );

}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C0D5E1',
        flex: 1,
        alignItems: 'center'
    },
    agregarNuevoBtn: {
        marginTop: 20,
        backgroundColor: '#E99125',
        padding: 15,
        borderRadius: 25,
        width: "60%"
    },
    textAgregarNuevoBtn: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titulo: {
        color: '#000',
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    imageProducto: {
        width: 75,
        height: 75,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    productoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        padding: 15,
        alignItems: 'center'
    },
    listaContainer: {
        width: "100%",
    },
    textoProductoContainer: {
        marginLeft: 15
    },
    guardarBtn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5db385",
        marginTop: 20,
        width: "20%"
    },
    guardarText: {
        fontWeight: 'bold',
        color: '#fff'
    },
    eliminarBtn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#bf4d4d",
        marginTop: 20,
        width: "20%",
        marginLeft: 15
    },
    eliminarText: {
        fontWeight: 'bold',
        color: '#fff'
    }
});
export default Ventas;