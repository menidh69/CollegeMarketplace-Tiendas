import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  TabBarIOS,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { NewUserContext } from "../NewUserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { List } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { TiendaContext } from "../TiendaContext";
import Tarjeta from "./Tarjeta";
import CuentaBancaria from "./CuentaBancaria";
import LoadingModal from "../components/LoadingModal";

const Stack = createStackNavigator();

const Micuenta = () => {
  const { user, setUser } = useContext(NewUserContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cuenta"
        children={() => <MicuentaScreen user={user} />}
        initialParams={{ user: user }}
        options={{
          title: "Mi cuenta",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="AgregarTarjeta"
        children={() => <Tarjeta />}
        options={{
          animationEnabled: false,
          title: "Mi cuenta",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
      <Stack.Screen
        name="AgregarCuentaBancaria"
        children={() => <CuentaBancaria />}
        options={{
          animationEnabled: false,
          title: "Mi cuenta",
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MicuentaScreen = ({ user }) => {
  const navigation = useNavigation();
  const { setUser } = useContext(NewUserContext);
  const { setTienda, tienda } = useContext(TiendaContext);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [infoBancaria, setInfoBancaria] = useState(undefined);
  const [cuentaBancaria, setCuentaBancaria] = useState(undefined);
  const logout = () => {
    
    navigation.reset({ routes: [{ name: "Auth" }] })
    setUser(null);
    return;
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchInfo().then((json) => {
        if (json.error) {
          return;
        }
        console.log(json);
        setInfoBancaria(json);
        fetchCuenta().then((json) => {
          if (json.error) {
            return;
          }
          setCuentaBancaria(json.bankaccount);
        });
      });
    }
    return () => (isMounted = false);
  }, []);

  const fetchInfo = async () => {
    const datos = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/cards/${user.id}`
    );
    const json = await datos.json();
    console.log(json);
    return json;
  };

  const fetchCuenta = async () => {
    const datos = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/bank_account/${tienda.id}`
    );
    const json = await datos.json();
    console.log(json);
    return json;
  };
  const borrarTarjeta = async () => {
    borrarCuentaBancaria();
    setModalShow(true);
    setLoading(true);
    setMessage("Eliminando");
    const datos = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/cards/${infoBancaria.tarjeta.id}`,
      {
        method: "DELETE",
      }
    );
    const resp = await datos.json();
    if (resp.error) {
      setLoading(false);
      setMessage("Ocurrio un error: " + resp.error);
      return;
    }
    setMessage("");
    setLoading(false);
    setModalShow(false);
    setInfoBancaria(undefined);
    return;
  };

  const borrarCuentaBancaria = async () => {
    setModalShow(true);
    setLoading(true);
    setMessage("Eliminando");
    const datos = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/bank_account/${cuentaBancaria.id}`,
      {
        method: "DELETE",
      }
    );
    const resp = await datos.json();
    if (resp.error) {
      setLoading(false);
      setMessage("Ocurrio un error: " + resp.error);
      return;
    }
    setMessage("");
    setLoading(false);
    setModalShow(false);
    setInfoBancaria(undefined);
    return;
  };

  const handleAgregarCuentaBancaria = () => {
    if (infoBancaria === undefined) {
      setModalShow(true);
      setMessage(
        "Para agregar una cuenta bancaria primero debes agregar una tarjeta"
      );
      return;
    }
    navigation.navigate("AgregarCuentaBancaria");
    return;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ width: "100%", paddingTop: 40 }}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 60 }}
      >
        <List.Section style={styles.datosPersonales}>
          <List.Accordion 
          title="Detalles personales"
           >
            <View style={styles.detallesContainer}>
              <View style={styles.imagen}></View>
              <View style={styles.datosPersonalesList}>
                <Text>
                  {user.nombre} {user.apellidos}
                </Text>
                <Text>{user.email}</Text>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                />
                <Text>{user.tel}</Text>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <List.Section style={styles.datosPersonales}>
          <List.Accordion title="Ordenes">
            <View style={styles.detallesContainer}>
              <View style={styles.imagen}></View>
              <View style={styles.datosPersonalesList}>
                <Text>Tarjetas</Text>
                <TouchableOpacity>
                  <Text>Agregar Tarjeta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <List.Section style={styles.datosPersonales}>
          <List.Accordion title="Tarjeta">
            <View style={styles.informacionBancaria}>
              <View style={styles.tarjetasContainer}>
                {infoBancaria === undefined ? (
                  <>
                    <Text>No has registrado ninguna tarjeta</Text>
                    <View style={styles.agregarTarjetaBtnContainer}>
                      <TouchableOpacity
                        style={styles.agregarTarjetaBtn}
                        onPress={() => navigation.navigate("AgregarTarjeta")}
                      >
                        <Text style={styles.textoAgregarTarjetaBtn}>
                          Agregar Tarjeta
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <Text>Numero de tarjeta</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>{infoBancaria.tarjeta.card_number}</Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "red",
                          marginHorizontal: 20,
                          padding: 15,
                        }}
                        onPress={borrarTarjeta}
                      >
                        <Text>Borrar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <List.Section style={styles.datosPersonales}>
          <List.Accordion title="Cuenta Bancaria">
            <View style={styles.informacionBancaria}>
              <View style={styles.tarjetasContainer}>
                {cuentaBancaria === undefined ? (
                  <>
                    <Text>No has registrado ninguna cuenta bancaria</Text>
                    <View style={styles.agregarTarjetaBtnContainer}>
                      <TouchableOpacity
                        style={styles.agregarTarjetaBtn2}
                        onPress={handleAgregarCuentaBancaria}
                      >
                        <Text style={styles.textoAgregarTarjetaBtn}>
                          Agregar Cuenta Bancaria
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <>
                    <Text>Clabe</Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>{cuentaBancaria.clabe}</Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "red",
                          marginHorizontal: 20,
                          padding: 15,
                        }}
                        onPress={borrarCuentaBancaria}
                      >
                        <Text>Borrar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <LoadingModal
          show={modalShow}
          setShow={setModalShow}
          loading={loading}
          message={message}
        ></LoadingModal>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.reset({ routes: [{ name: "Landing" }] })}>
          <Text style={styles.textoAgregarTarjetaBtn}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C0D5E1",
    alignItems: "center",
    justifyContent: "center",
  },
  datos: {
    fontSize: 24,
  },
  datosPersonales: {
    backgroundColor: "#FFFFFF",
    
    borderRadius: 25,
    width: "80%",
  },
  datosPersonalesList: {
    padding: 10,
  },
  titulos: {
    fontWeight: 'bold'
  },
  imagen: {
    width: 50,
    height: 75,
    backgroundColor: "black",
  },
  detallesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  informacionBancaria: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  tarjetasContainer: {
    padding: 10,
    width: "80%",
  },
  agregarTarjetaBtnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  agregarTarjetaBtn: {
    marginTop: 20,
    width: "80%",
    padding: 15,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#16b585",
  },
  agregarTarjetaBtn2: {
    marginTop: 20,
    width: "105%",
    padding: 15,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#16b585",
  },
  textoAgregarTarjetaBtn: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
  logoutBtn: {
    marginTop: 20,
    width: "80%",
    padding: 15,
    borderRadius: 25,
    height: 50,
    backgroundColor: "#bf4d4d",
  },
});

export default Micuenta;
