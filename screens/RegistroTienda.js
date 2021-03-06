import React, { useState, useContext } from "react";
import { useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Button,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RegistroContext } from "../RegistroContext";
import { Picker } from "@react-native-picker/picker";
import {
  emailValidation,
  isEmptyNull,
  repeatPassword,
} from "../functions/formValidation";
import ErrorModal from "../components/ErrorModal";

const RegistroTienda = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const { datos, onChangeText, setDatos } = useContext(RegistroContext);
  const [showmodal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetchitems().then((response) => {
      if (isMounted) {
        setItems(response);
      }
    });
    return () => (isMounted = false);
  }, []);

  const handleNext = () => {
    if (isEmptyNull(datos.nombre_tienda) || isEmptyNull(datos.horario)) {
      setShowModal(true);
      setModalMessage("Debes llenar todos los campos");
      return;
    }
    return navigation.navigate("SubirImagen");
  };

  const fetchitems = async () => {
    const datos = await fetch(
      "http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/universidades"
    );
    const universidades = await datos.json();
    console.log(universidades);
    return universidades;
  };

  const styles = StyleSheet.create({
    baseText: {
      fontFamily: "Cochin",
    },
    titleText: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "left",
      marginBottom: 20,
    },
    basicText: {
      fontSize: 20,
      fontWeight: "300",
      textAlign: "left",
      marginBottom: 20,
    },
    input: {
      backgroundColor: "#FFFFFF",
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 15,
      padding: 5,
      paddingLeft: 20,
    },
    pickerItem: {
      width: 200,
      height: 132,
      backgroundColor: "white",
      borderColor: "black",
      color: "black",
    },
    pickerItem2: {
      width: 200,
      height: 115,
      backgroundColor: "white",
      borderColor: "black",
      color: "black",
    },
    pickerItem1: {
      width: 200,
      height: 80,
      backgroundColor: "white",
      borderColor: "black",
      color: "black",
    },
    pickerView:
      Platform.OS === "ios"
        ? {
            width: "100%",
            alignItems: "center",
            height: 132,
            marginBottom: 10,
            borderRadius: 30,
            backgroundColor: "white",
          }
        : {
            backgroundColor: "white",
            borderRadius: 30,
            width: "100%",
            height: 50,
            marginBottom: 20,
            alignItems: "center",
            marginTop: 10,
            color: "black",
          },
    pickerView2:
      Platform.OS === "ios"
        ? {
            width: "100%",
            alignItems: "center",
            height: 115,
            marginBottom: 10,
            borderRadius: 30,
            backgroundColor: "white",
          }
        : {
            backgroundColor: "white",
            borderRadius: 30,
            width: "100%",
            height: 50,
            marginBottom: 20,
            alignItems: "center",
            marginTop: 10,
            color: "black",
          },
    pickerView1:
      Platform.OS === "ios"
        ? {
            width: "100%",
            alignItems: "center",
            height: 80,
            marginBottom: 10,
            borderRadius: 30,
            backgroundColor: "white",
          }
        : {
            backgroundColor: "white",
            borderRadius: 30,
            width: "100%",
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
    pickerInput: {
      backgroundColor: "#FFFFFF",
      height: 25,
      borderColor: "gray",
      borderWidth: 1,
    },
    inputPicker: {
      backgroundColor: "#FFFFFF",
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 15,
      padding: 5,
    },
    container: {
      backgroundColor: "#B1D8EE",
      flex: 1,
    },
    inputView: {
      marginTop: 5,
      marginBottom: 5,
    },
    label: {
      margin: 5,
      fontSize: 14,
    },
    button: {
      borderRadius: 20,
      backgroundColor: "#E99125",
      height: 40,
      color: "#FFFFFF",
      marginTop: 30,
      textAlign: "center",
      paddingTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 30 }}>
        <Text style={styles.titleText}>Crea tu Tienda</Text>
        <Text style={styles.basicText}>
          Introduce la información básica de tu tienda.
        </Text>

        <View style={styles.inputView}>
          <Text style={styles.label}>Nombre de la Tienda*:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeText(text, "nombre_tienda")}
            value={datos.nombre_tienda}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Tipo de tienda:</Text>

          <View style={styles.pickerView}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem}
              selectedValue={datos.tipo_tienda}
              onValueChange={(itemValue, itemIndex) =>
                setDatos({ ...datos, tipo_tienda: itemValue })
              }
            >
              <Picker.Item label={"Cafetería"} value={"1"} />
              <Picker.Item label={"Cooperativa"} value={"2"} />
              <Picker.Item label={"Puesto"} value={"3"} />
            </Picker>
          </View>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>Horario*:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onChangeText(text, "horario")}
            value={datos.horario}
          />
        </View>

        <View style={styles.inputView}>
          <Text style={styles.label}>¿Aceptan tarjeta?</Text>
          <View style={styles.pickerView2}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem2}
              selectedValue={datos.tarjeta}
              onValueChange={(itemValue, itemIndex) =>
                setDatos({ ...datos, tarjeta: itemValue })
              }
            >
              <Picker.Item label={"Si"} value={"true"} />
              <Picker.Item label={"No"} value={"false"} />
            </Picker>
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Universidad*:</Text>
          <View style={styles.pickerView1}>
            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItem1}
              selectedValue={datos.id_universidad}
              onValueChange={(itemValue, itemIndex) =>
                setDatos({
                  ...datos,
                  id_universidad: itemValue,
                  nombre_universidad: items[itemIndex].nombre,
                })
              }
            >
              {items.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={item.nombre}
                  value={item.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          text="Siguiente"
          onPress={() => navigation.navigate("RegistroDatos")}
          style={styles.button}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 20 }}>
            Anterior
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          text="Siguiente"
          onPress={() => handleNext()}
          style={styles.button}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 20 }}>
            Siguiente
          </Text>
        </TouchableOpacity>
        <ErrorModal
          setShow={setShowModal}
          show={showmodal}
          message={modalMessage}
        ></ErrorModal>
      </ScrollView>
    </View>
  );
};

export default RegistroTienda;
