import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import Home from "./screens/Home";
import Editarinfo from "./screens/Editarinfo";
import Mitienda from "./screens/Mitienda";
import Productos from "./screens/Productos";
import { NewUserContext } from "./NewUserContext";
import { TiendaContext } from "./TiendaContext";
import * as firebase from "firebase";
import ApiKeys from "./constants/ApiKeys";
import AsyncStorage from "@react-native-community/async-storage";
import Auth from "./screens/Auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [tienda, setTienda] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

  const checkSignedIn = async () => {
    const token = AsyncStorage.getItem("token.tuw");
    if (!token || token == "") return;
    const auth = await fetch(
      "http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/auth/user",
      {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      }
    ).then(async (resp) => {
      const usuario = await resp.json();
      if (resp.status == 400) {
        AsyncStorage.removeItem("token.tuw");
        setUser(null);
        return;
      } else {
        const response = await fetch(
          `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1//miTienda/${result.user.id}`
        );
        const it = await response.json();
        console.log(it[0]);
        setTienda(it[0]);
        setUser(usuario);
        return;
      }
    });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      checkSignedIn();
    }
    return () => (isMounted = false);
  }, []);

  return (
    <NewUserContext.Provider value={{ user, setUser }}>
      <TiendaContext.Provider value={{ tienda, setTienda }}>
        <NavigationContainer>
          <Stack.Navigator>
            {user == null ? (
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Home"
                component={Home}
                options={({ route }) => ({
                  headerShown: false,
                  shadowOffset: {
                    height: 0,
                  },
                })}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </TiendaContext.Provider>
    </NewUserContext.Provider>
  );
}
