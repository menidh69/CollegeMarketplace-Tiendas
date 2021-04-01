import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import { TiendaContext } from "../TiendaContext";
import { useForm } from "react-hook-form";

const EditarProducto = ({ route }) => {
  const { tienda, setTienda } = useContext(TiendaContext);
  const [categoria, setCategoria] = useState(
    String(route.params.producto.id_categoria)
  );
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const onSubmit = async (data) => {
    try {
      data.id_tienda = tienda.id;
      const body = data;
      const response = await fetch(
        `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/editarProducto/${route.params.producto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).then(async (resp) => {
        const result = await resp.json();
        if (result.error) {
          console.log(result.error);
        } else {
          console.log(result);
          navigation.reset({
            routes: [{ name: "Productos" }],
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("id_tienda");
    register("nombre");
    register("precio");
    register("id_categoria");
    register("url_imagen");
    register("descripcion");
  }, [register]);
  var precio = route.params.producto.precio;
  var precioText = "" + precio;
  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nombre"
          placeholderTextColor="#003f5c"
          maxLength={20}
          onChangeText={(text) => {
            setValue("nombre", text);
          }}
          defaultValue={route.params.producto.nombre}
        />
      </View>

      <Text>Precio:</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Precio"
          placeholderTextColor="#003f5c"
          keyboardType="number-pad"
          maxLength={6}
          onChangeText={(text) => {
            setValue("precio", text);
          }}
          defaultValue={precioText}
        />
      </View>

      <Text>Categoría:</Text>
      <View style={styles.pickerView}>
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          defaultValue={String(route.params.producto.id_categoria)}
          selectedValue={categoria}
          onValueChange={(value, itemIndex) => {
            setValue("id_categoria", value);
            setCategoria(value);
          }}
        >
          <Picker.Item label="Desayuno" value="1" />
          <Picker.Item label="Comida" value="2" />
          <Picker.Item label="Saludable" value="3" />
          <Picker.Item label="Bebidas" value="4" />
          <Picker.Item label="Postres" value="5" />
          <Picker.Item label="Snacks" value="6" />
        </Picker>
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
          onChangeText={(text) => {
            setValue("descripcion", text);
          }}
          defaultValue={route.params.producto.descripcion}
        />
      </View>

      <TouchableOpacity
        style={styles.guardarBtn}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.guardarText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C0D5E1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "#E2DFDF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  TextInputDescripcion: {
    height: "80%",
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  pickerItem: {
    width: 200,
    height: 132,
    backgroundColor: "#C0D5E1",
    borderColor: "black",
    color: "black",
  },
  pickerView:
    Platform.OS === "ios"
      ? {
          width: "70%",
          alignItems: "center",
          height: 132,
          marginBottom: 20,
          marginTop: 10,
        }
      : {
          backgroundColor: "#E2DFDF",
          borderRadius: 30,
          width: "70%",
          height: 50,
          marginBottom: 20,
          alignItems: "center",
          marginTop: 10,
          color: "black",
        },
  picker: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  guardarBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5db385",
    marginTop: 20,
    width: "50%",
  },
  guardarText: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default EditarProducto;
