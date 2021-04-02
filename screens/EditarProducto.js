import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import * as firebase from "firebase";
import LoadingModal from "../components/LoadingModal";

import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
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
  const [img, setIMG] = useState(route.params.producto.url_imagen.toString());
  const [uri, setURI] = useState("");
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const deleteFromFirebase = (url) => {
    //1.
    const pictureRef = firebase.storage().refFromURL(url);
    //2.
    pictureRef
      .delete()
      .then(() => {
        //3.
        console.log("Elimnada con exito");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = async (data, imgChanged) => {
    try {
      data.id_tienda = tienda.id;
      if (uri !== "" && img !== route.params.producto.url_imagen) {
        data.url_imagen = imgChanged;
      }
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
          setModalMessage("Ocurrió un error, intenta mas tarde");
          setLoading(false);
          return;
        } else {
          console.log(result);
          setShow(false);
          setModalMessage("");
          setLoading(false);
          return navigation.reset({
            routes: [{ name: "Productos" }],
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const changeImage = async (data) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // setDatos({...datos, "url_imagen": url})
      setURI(result.uri);
      setIMG(result.uri);
      // console.log(url)
    }
    return;
  };

  const guardar = async (data) => {
    setShow(true);
    setLoading(true);
    setModalMessage("Guardando tu producto");
    let nombre = null;
    if (data.nombre) {
      nombre = data.nombre;
    } else {
      nombre = route.params.producto.nombre;
    }
    if (uri !== "" && img !== route.params.producto.url_imagen) {
      deleteFromFirebase(route.params.producto.url_imagen);
      const response = await fetch(uri);
      const blob = await response.blob();
      var uploadTask = firebase
        .storage()
        .ref()
        .child("producto/" + tienda.id + "-" + route.params.producto.nombre)
        .put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setLoading(false);
          setModalMessage("Ocurrio un error");
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            try {
              submit(data, downloadURL);
            } catch (e) {
              console.log(e);
            }
          });
        }
      );
    } else {
      submit(data, "");
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
      <TouchableOpacity onPress={changeImage}>
        <Image
          style={{
            borderRadius: 20,
            width: 100,
            height: 100,
            borderColor: "black",
            borderWidth: 1,
          }}
          source={{ uri: img }}
        />
      </TouchableOpacity>
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
        onPress={handleSubmit(guardar)}
      >
        <Text style={styles.guardarText}>Guardar</Text>
      </TouchableOpacity>
      <LoadingModal
        show={show}
        setShow={setShow}
        message={modalMessage}
        loading={loading}
      />
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
