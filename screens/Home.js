import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, TabBarIOS, Text, View } from "react-native";
import { UserContext } from "../UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import Productos from "./Productos";
import Pedidos from "./Pedidos";
import Mitienda from "./Mitienda";
import MiCuenta from "./Micuenta";
import Ventas from "./Ventas";

const Home = ({ route }) => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Mi Tienda" children={() => <Mitienda />} />
        <Tab.Screen name="Productos" children={() => <Productos />} />
        <Tab.Screen name="Pedidos" children={() => <Pedidos />} />
        <Tab.Screen name="Ventas" children={() => <Ventas />} />
        <Tab.Screen name="Mi Cuenta" children={() => <MiCuenta />} />
      </Tab.Navigator>
    </>
  );
};

const HomeScreen = () => {
  const { user } = useContext(NewUserContext);
  return (
    <>
      <View>
        <Text>Hola este es el inicio {user.nombre} </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E6995",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
