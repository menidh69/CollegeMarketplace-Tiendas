import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistroDatos from "./RegistroDatos";
import RegistroTienda from "./RegistroTienda";
import SubirImagen from "./SubirImagen";
import Confirmar from "./Confirmar";
const RegistroStack = createStackNavigator();
import { RegistroContext } from "../RegistroContext";
import RegistroExitoso from "./RegistroExitoso";
import {
  numberValidation,
  textValidation,
  emailValidation,
  limit,
} from "../functions/formValidation";

const Registro = () => {
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    contraseña: "",
    repetirContraseña: "",
    telefono: "",
    email: "",
    id_universidad: "1",
    nombre_universidad: "",
    nombre_tienda: "",
    horario: "",
    url_imagen: "",
    tipo_tienda: "2",
    tarjeta: "false",
    uri: "",
  });

  const onChangeText = (text, form) => {
    switch (form) {
      case "nombre":
        if (textValidation(text) && !limit(text, 20)) {
          setDatos({ ...datos, nombre: text });
        }
        return;
      case "apellidos":
        if (textValidation(text) && !limit(text, 30)) {
          setDatos({ ...datos, apellidos: text });
        }
        return;
      case "email":
        if (!limit(text, 30)) {
          setDatos({ ...datos, email: text });
        }
        return;
      case "contraseña":
        if (!limit(text, 20)) {
          setDatos({ ...datos, contraseña: text });
        }
        return;
      case "repetirContraseña":
        if (!limit(text, 20)) {
          setDatos({ ...datos, repetirContraseña: text });
        }
        return;
      case "telefono":
        if (numberValidation(text) && !limit(text, 10)) {
          setDatos({ ...datos, telefono: text });
        }
        return;
      case "universidad":
        setDatos({ ...datos, universidad: text });
        return;
      case "nombre_tienda":
        if (!limit(text, 25)) {
          setDatos({ ...datos, nombre_tienda: text });
        }
        return;
      case "horario":
        if (!limit(text, 20)) {
          setDatos({ ...datos, horario: text });
        }
        return;
      case "imagen_url":
        setDatos({ ...datos, imagen_url: text });
        return;
      case "tipo_tienda":
        setDatos({ ...datos, tipo_tienda: text });
        return;
      case "tarjeta":
        setDatos({ ...datos, tarjeta: text });
        return;
    }
  };

  return (
    <RegistroContext.Provider value={{ datos, onChangeText, setDatos }}>
      <RegistroStack.Navigator>
        <RegistroStack.Screen
          name="RegistroDatos"
          component={RegistroDatos}
          options={{ title: "Sign Up" }}
        />

        <RegistroStack.Screen
          name="RegistroTienda"
          component={RegistroTienda}
          options={{ title: "Sign Up" }}
        />
        <RegistroStack.Screen
          name="SubirImagen"
          component={SubirImagen}
          options={{ title: "Sube tu foto" }}
        />
        <RegistroStack.Screen
          name="Confirmar"
          component={Confirmar}
          options={{ title: "Confirmar" }}
        />
        <RegistroStack.Screen
          name="Exito"
          component={RegistroExitoso}
          options={{ title: "Exito" }}
        />
      </RegistroStack.Navigator>
    </RegistroContext.Provider>
  );
};
export default Registro;
