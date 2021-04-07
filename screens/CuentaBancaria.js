import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { NewUserContext } from "../NewUserContext";
import { useNavigation } from "@react-navigation/native";
import utf8 from "utf8";
import Base64 from "../utils/Base64";
import LoadingModal from "../components/LoadingModal";
import { TiendaContext } from "../TiendaContext";

const CuentaBancaria = () => {
  const navigation = useNavigation();
  const { user } = useContext(NewUserContext);
  const { tienda } = useContext(TiendaContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [datosBancarios, setDatosBancarios] = useState({
    user_id: user.id,
    id_tienda: tienda.id,
    clabe: user.email,
    alias: "",
    holder_name: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    setShowModal(true);
    setMessage("Guardando...");
    const guardar = await fetch(
      "http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/bank_account",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosBancarios),
      }
    );
    const resp = await guardar.json();
    if (resp.error) {
      setLoading(false);
      setMessage("Ocurrió un error al guardar los datos: " + resp.error);
      console.log(resp);
      return;
    }
    setLoading(false);
    setMessage("");
    setShowModal(false);
    console.log(resp);
    navigation.reset({
      routes: [{ name: "Cuenta" }],
    });
    return;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Agrega tu Cuenta Bancaria</Text>
      <Text style={styles.subtitle}>
        Ingresa los siguientes datos para registrar la cuenta bancaria donde
        recibirás tus depositos
      </Text>
      <TextInput
        style={{ ...styles.input, width: "100%" }}
        onChangeText={(value) =>
          setDatosBancarios({ ...datosBancarios, clabe: value })
        }
        placeholder={"CLABE"}
        maxLength={18}
      ></TextInput>
      <TextInput
        style={{ ...styles.input, width: "100%" }}
        onChangeText={(value) =>
          setDatosBancarios({ ...datosBancarios, alias: value })
        }
        placeholder={"ALIAS"}
        maxLength={25}
      ></TextInput>
      <TextInput
        style={{ ...styles.input, width: "100%" }}
        onChangeText={(value) =>
          setDatosBancarios({ ...datosBancarios, holder_name: value })
        }
        placeholder={"HOLDER_NAME"}
        maxLength={40}
      ></TextInput>
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => handleSubmit()}
      >
        <Text>Guardar</Text>
      </TouchableOpacity>
      <LoadingModal
        loading={loading}
        show={showModal}
        setShow={setShowModal}
        message={message}
      ></LoadingModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },

  btnPrimary: {
    marginTop: 20,
    width: "80%",
    padding: 15,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#E99125",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingLeft: 20,
    margin: 10,
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: "row",
  },
});

export default CuentaBancaria;
