import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { UserContext } from "../UserContext";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import { createStackNavigator } from "@react-navigation/stack";
import { TiendaContext } from "../TiendaContext";
import RegistroProducto from "./RegistroProducto";
import Food from "../assets/food.png";
import EditarProducto from "./EditarProducto";
import EliminarProducto from "./EliminarProducto";

const Stack = createStackNavigator();

const Productos = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Productos"
        component={ProductosScreen}
        options={{
          title: "Gestion de productos",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="RegistroProducto"
        component={RegistroProducto}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditarProducto"
        component={EditarProducto}
        options={{
          title: "Editar producto",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
      <Stack.Screen
        name="EliminarProducto"
        component={EliminarProducto}
        options={{
          title: "Eliminar producto",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ProductosScreen = () => {
  const { user, setUser } = useContext(NewUserContext);
  const { tienda, setTienda } = useContext(TiendaContext);

  const navigation = useNavigation();

  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchitems().then((it) => {
        setItems(it);
      });
    }
    return () => (isMounted = false);
  }, []);

  const fetchitems = async (id) => {
    const data = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/productosTienda/${tienda.id}`
    );
    const it = await data.json();
    return it;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.agregarNuevoBtn}
        onPress={() => navigation.navigate("RegistroProducto")}
      >
        <Text style={styles.textAgregarNuevoBtn}>Agregar nuevo producto</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        {items.length > 0 ? "Gestiona tus Productos" : "No hay Productos"}
      </Text>

      <FlatList
        style={styles.listaContainer}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Producto producto={item} />}
      />
    </View>
  );
};

const Producto = ({ producto }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.productoContainer}>
        <View style={styles.imageProducto}>
          <Image
            style={styles.imageProducto}
            source={{ uri: producto.url_imagen }}
          />
        </View>
        <View style={styles.textoProductoContainer}>
          <Text style={{ fontWeight: 'bold' }}>{producto.nombre}</Text>
          <Text >${Number.parseFloat(producto.precio).toFixed(2)}</Text>
          <Text>{producto.descripcion}</Text>
        </View>
        <View
          style={{
            width: "130%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={styles.guardarBtn}
            onPress={() =>
              navigation.navigate("EditarProducto", { producto: producto })
            }
          >
            <Image source={require("../assets/edit.png")} style={styles.icono} />
            <Text style={styles.guardarText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eliminarBtn}
            onPress={() =>
              navigation.navigate("EliminarProducto", { producto: producto })
            }
          >
            <Image source={require("../assets/delete.png")} style={styles.icono} />
            <Text style={styles.eliminarText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 10,
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C0D5E1",
    flex: 1,
    alignItems: "center",
  },
  agregarNuevoBtn: {
    marginTop: 20,
    backgroundColor: "#E99125",
    padding: 15,
    borderRadius: 25,
    width: "60%",
  },
  textAgregarNuevoBtn: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  titulo: {
    color: "#000",
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  imageProducto: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: "white",
  },
  icono: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  logo: {
    borderRadius: 20,
    width: "90%",
    height: "40%",
  },
  productoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    padding: 15,
    alignItems: "center",
  },
  listaContainer: {
    width: "100%",
  },
  textoProductoContainer: {
    marginLeft: 15,
    
  },
  guardarBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5db385",
    marginTop: 20,
    flexDirection: "row",
    width: "25%",
  },
  guardarText: {
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 7,
  },
  boton: {
    backgroundColor: "#E2DFDF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  eliminarBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#bf4d4d",
    marginTop: 20,
    width: "26%",
    marginLeft: 15,
  },
  eliminarText: {
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 5,
    
  },
});

export default Productos;
