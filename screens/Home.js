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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ route }) => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Mi Tienda" children={() => <Mitienda />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="store" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Productos" children={() => <Productos />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="food-fork-drink" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Pedidos" children={() => <Pedidos />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="ticket" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Ventas" children={() => <Ventas />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="currency-usd" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Mi Cuenta" children={() => <MiCuenta />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }} />
      </Tab.Navigator>
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
