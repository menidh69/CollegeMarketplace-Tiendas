import React, { useEffect, useState, useContext } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Button,
  Touchable,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Editarinfo from "./Editarinfo";
import Productos from "./Productos";
import { TiendaContext } from "../TiendaContext";
import Map from "./Map";

const Stack = createStackNavigator();

const Mitienda = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mitienda"
        component={Mitiendascreen}
        options={{
          title: "Mi tienda",
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
        name="Editarinfo"
        component={Editarinfo}
        options={{
          title: "Editar informacion",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Ubicación",
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
const Mitiendascreen = () => {
  const navigation = useNavigation();
  const { tienda } = useContext(TiendaContext);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: tienda.url_imagen }} />
      <Text style={{ ...styles.titulo, fontSize: 34 }}>{tienda.nombre}</Text>
      <Text style={styles.titulo}>Balance</Text>
      <Text style={styles.textoNormal}>$ {tienda.balance.balance}</Text>
      <TouchableOpacity
        style={styles.editinfo}
        onPress={() => navigation.navigate("Editarinfo", { tienda: tienda })}
      >
        <Text style={styles.edtext}>Editar informacion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editinfo}
        onPress={() => navigation.navigate("Map", { tienda: tienda })}
      >
        <Text style={styles.edtext}>Editar Ubicación</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.agmenu}
        onPress={() => navigation.navigate("Productos")}
      >
        <Text style={styles.agtext}>Gestionar menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#101010",
    fontWeight: "700",
  },
  titulo: {
    color: "#000",
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  textoNormal: {
    color: "#000",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  logo: {
    borderRadius: 20,
    width: "90%",
    height: "40%",
  },
  fondo: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    alignItems: "center",
    width: "95%",
    justifyContent: "space-between",
  },
  editinfo: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E99125",
    marginTop: 20,
    width: "50%",
    marginLeft: 15,
  },
  agmenu: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE0BA",
    marginTop: 20,
    width: "50%",
    marginLeft: 15,
  },
  agtext: {
    fontWeight: "bold",
    color: "#000",
  },
  edtext: {
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default Mitienda;
