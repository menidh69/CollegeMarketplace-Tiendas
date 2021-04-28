import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Auth from "./screens/Auth";
import { Notifications} from "expo";
import * as Permissions from "expo-permissions";

const getToken = async () =>{
  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !=="granted"){
    return;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  return token;
};

export default class Noti extends React.Component{
  componentDidMount(){
    getToken();
  }
  render(){
  return (
    <VIew style ={styles.container}>
      <Text>Open up Noti.js to start working on your app!</Text>
    </VIew>
  );
  }
}
  const styles = StyleSheet.create({
    container:{ 
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent:"center"
    }
  })