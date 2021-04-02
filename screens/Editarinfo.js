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
  TextInput,
  Image,
} from "react-native";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { TiendaContext } from "../TiendaContext";
import { useForm } from "react-hook-form";
import LoadingModal from "../components/LoadingModal";

const Editarinfo = ({ route }) => {
  const { tienda, setTienda } = useContext(TiendaContext);
  const [img, setimg] = useState(route.params.tienda.url_imagen);
  const [uri, setURI] = useState("");
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, url) => {
    try {
      data.id_tienda = tienda.id;
      data.url_imagen = url;
      const body = data;
      const response = await fetch(
        `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/tiendas/${route.params.tienda.id}`,
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
          if (data.horario) {
            setTienda({
              ...tienda,
              horario: data.horario,
            });
          }
          if (data.nombre) {
            setTienda({
              ...tienda,
              nombre: data.nombre,
            });
          }
          if (url) {
            setTienda({
              ...tienda,
              url_imagen: url,
            });
          }
          navigation.reset({
            routes: [{ name: "Mitienda" }],
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
      setimg(result.uri);
      // console.log(url)
    }
    return;
  };

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

  const guardar = async (data) => {
    setShow(true);
    setLoading(true);
    setModalMessage("Guardando tu producto");
    if (uri !== "" && img !== route.params.tienda.url_imagen) {
      deleteFromFirebase(route.params.tienda.url_imagen);
      const response = await fetch(uri);
      const blob = await response.blob();
      var uploadTask = firebase
        .storage()
        .ref()
        .child("tienda/" + tienda.id)
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
              onSubmit(data, downloadURL);
            } catch (e) {
              console.log(e);
            }
          });
        }
      );
    } else {
      onSubmit(data, undefined);
    }
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("Id_tipo_tienda");
    register("nombre");
    register("horario");
    register("url_imagen");
    register("tarjeta");
  }, [register]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={{ borderWidth: 1, width: 400 }}
        onPress={changeImage}
      >
        <Image style={{ height: 300 }} source={{ uri: img }} />
      </TouchableOpacity>
      <Text style={{ marginBottom: 20 }}>
        Selecciona la imagen para editarla
      </Text>
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
          defaultValue={route.params.tienda.nombre}
        />
      </View>

      <Text>Horario:</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Horario"
          placeholderTextColor="#003f5c"
          maxLength={20}
          onChangeText={(text) => {
            setValue("horario", text);
          }}
          defaultValue={route.params.tienda.horario}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C0D5E1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    borderRadius: 20,
    width: "90%",
    height: "40%",
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

export default Editarinfo;
