import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { alert, useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { UserContext } from "../UserContext";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NewUserContext } from "../NewUserContext";
import { createStackNavigator } from "@react-navigation/stack";
import { TiendaContext } from "../TiendaContext";
import RegistroProducto from "./RegistroProducto";
import Food from "../assets/food.png";
import EditarProducto from "./EditarProducto";
import EliminarProducto from "./EliminarProducto";
import NumericInput from "react-native-numeric-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import LoadingModal from "../components/LoadingModal";

const Stack = createStackNavigator();

const VentasStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          title: "Mis ventas",
          headerTitleAlign: "center",
          headerStatusBarHeight: 18,
          headerTitleStyle: {
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
      <Stack.Screen
        name="Ventas"
        component={Ventas}
        options={{
          title: "Ventas mensuales",
          headerTitleAlign: "center",
          headerStatusBarHeight: 18,
          headerTitleStyle: {
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />
      <Stack.Screen
        name="Retiros"
        component={Retiros}
        options={{
          title: "Transacciones",
          headerTitleAlign: "center",
          headerStatusBarHeight: 18,
          headerTitleStyle: {
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />

      <Stack.Screen
        name="Histreti"
        component={Histreti}
        options={{
          title: "Historial de retiros",
          headerTitleAlign: "center",
          headerStatusBarHeight: 18,
          headerTitleStyle: {
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />

      <Stack.Screen
        name="Solreti"
        component={Solreti}
        options={{
          title: "Hacer retiro",
          headerTitleAlign: "center",
          headerStatusBarHeight: 18,
          headerTitleStyle: {
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: "#C0D5E1",
            shadowOffset: {
              height: 0,
            },
          },
        }}
      />

      <Stack.Screen
        name="VentaDiaria"
        component={VentaDiaria}
        options={{
          title: "Ventas Diaria",
          headerTitleAlign: "center",
          headerStatusBarHeight: 18,
          headerTitleStyle: {
            fontSize: 24,
          },
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

const Balance = () => {
  const { user, setUser } = useContext(NewUserContext);
  const { tienda, setTienda } = useContext(TiendaContext);

  const navigation = useNavigation();

  const [balance, setBalance] = useState([]);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchitems().then((json) => {
        setBalance(json.balance);
      });
    }
    return () => (isMounted = false);
  }, []);

  const fetchitems = async (id) => {
    try {
      const data = await fetch(
        `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/balance/${tienda.id}`
      );
      const it = await data.json();
      console.log(it);
      return it;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return (
    <>
      <View style={styles.container}>
        {balance && (
          <View style={[styles.card, styles.shadow]}>
            <Text style={styles.titulo}>Balance</Text>
            <Text style={[styles.titulo, styles.balance]}>
              $ {balance.balance}
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.buttonBlock, styles.shadow]}
          onPress={() => navigation.navigate("Ventas")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.btnText}>Historial de ventas</Text>
            <Text style={styles.btnIcon}>➡︎</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonBlock, styles.shadow]}
          onPress={() => navigation.navigate("VentaDiaria")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.btnText}>Venta diaria</Text>
            <Text style={styles.btnIcon}>➡︎</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonBlock, styles.shadow]}
          onPress={() => navigation.navigate("Retiros")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.btnText}>Retiros</Text>
            <Text style={styles.btnIcon}>➡︎</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C0D5E1",
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  container2: {
    backgroundColor: "#C0D5E1",
    flex: 1,
    alignItems: "center",
    padding: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  agregarNuevoBtn: {
    marginTop: 20,
    backgroundColor: "#E99125",
    padding: 15,
    borderRadius: 25,
    width: "70%",
  },
  textAgregarNuevoBtn: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  column1: {
    width: "50%",
    textAlign: "left",
    fontSize: 24,
  },
  column2: {
    width: "50%",
    textAlign: "right",
    fontSize: 24,
  },
  titulo: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  titulo2: {
    color: "#000",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 30,
    marginVertical: 20,
    padding: 20,
  },
  card2: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 20,
    padding: 25,
  },

  balance: {
    fontSize: 38,
    fontWeight: "normal",
    margin: 10,
  },
  buttonBlock: {
    shadowColor: "black",
    borderRadius: 20,
    backgroundColor: "#88CBF1",
    width: "100%",
    padding: 15,
    marginVertical: 15,
  },
  btnText: {
    textAlign: "left",
    width: "50%",
    fontSize: 15,
  },
  btnIcon: {
    textAlign: "right",
    width: "50%",
    fontSize: 24,
  },
  shadow:
    Platform.OS === "ios"
      ? {
          shadowColor: "black",
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 10,
        }
      : {
          shadowColor: "black",
          elevation: 2,
        },
  graphStyle: {},
});

const Ventas = () => {
  const { tienda } = useContext(TiendaContext);
  const [items, setItems] = useState();
  const [graphData, setGraphData] = useState();
  const [grafica, setGrafica] = useState(false);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchItems().then((json) => {
        if (json.length > 0) {
          setItems(json);
          let meses = [];
          let totales = [];
          json.map((item) => {
            meses.push(item.mes);
            totales.push(item.total);
          });
          setGraphData({
            labels: meses,
            datasets: [
              {
                data: totales,
              },
            ],
          });
        } else {
          console.log(json);
        }
      });
    }
    return () => (isMounted = false);
  }, []);

  const fetchItems = async () => {
    try {
      const data = await fetch(
        `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/ventas/${tienda.id}?year="2021"`
      );
      const it = await data.json();
      console.log(it);
      return it.ventas;
    } catch (e) {
      console.log(e);
      return;
    }
  };
  console.log(items);

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: () => `#e26a00`,
    labelColor: () => `#e26a00`,
    style: {
      borderRadius: 16,
    },
    fillShadowGradientOpacity: 1,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const renderItem = ({ item }) => (
    <View style={{ ...styles.row, backgroundColor: "#FFE0BA" }}>
      <Text style={styles.column1}>{item.mes}</Text>
      <Text style={styles.column2}>$ {item.total}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items ? (
        <View style={styles.card}>
          {grafica ? (
            <BarChart
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              data={graphData}
              width={Dimensions.get("window").width * 0.8}
              height={400}
              yAxisLabel="$"
              chartConfig={chartConfig}
              verticalLabelRotation={90}
              fromZero={true}
            />
          ) : (
            <>
              <View
                style={{
                  ...styles.row,
                  backgroundColor: "#E99125",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <Text style={{ ...styles.column1, fontWeight: "bold" }}>
                  Mes
                </Text>
                <Text style={{ ...styles.column2, fontWeight: "bold" }}>
                  Ventas
                </Text>
              </View>
              <View>
                <FlatList
                  data={items}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.mes}
                />
              </View>
              <View
                style={{
                  ...styles.row,
                  backgroundColor: "#FFE0BA",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              ></View>
            </>
          )}
          <View
            style={{
              ...styles.row,
              justifyContent: "space-around",
              marginVertical: 5,
            }}
          >
            <TouchableOpacity
              style={{
                ...[styles.column1, styles.shadow],
                backgroundColor: "#1E6995",
                width: "40%",
                paddingVertical: 5,
                borderRadius: 10,
              }}
              onPress={() => setGrafica(false)}
            >
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "white" }}
              >
                Tabla
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...[styles.column2, styles.shadow],
                backgroundColor: "#1E6995",
                width: "40%",
                paddingVertical: 5,
                borderRadius: 10,
              }}
              onPress={() => setGrafica(true)}
            >
              <Text
                style={{ fontSize: 20, textAlign: "center", color: "white" }}
              >
                Grafica
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.title}>Aun no tienes ventas</Text>
      )}
    </ScrollView>
  );
};

const Retiros = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.buttonBlock, styles.shadow]}
          onPress={() => navigation.navigate("Histreti")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.btnText}>Historial de retiros</Text>
            <Text style={styles.btnIcon}>➡︎</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonBlock, styles.shadow]}
          onPress={() => navigation.navigate("Solreti")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.btnText}>Solicitar retiro</Text>
            <Text style={styles.btnIcon}>➡︎</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Histreti = () => {
  const { tienda } = useContext(TiendaContext);
  const [items, setItems] = useState(undefined);

  const fetchItems = async () => {
    const datos = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/tienda/${tienda.id}/retiros`
    );
    const resp = await datos.json();
    if (resp.error) {
      return undefined;
    }
    return resp.datos;
  };

  const formatDate = (utc) => {
    const dateObj = new Date(utc);
    var month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    var day = String(dateObj.getUTCDate()).padStart(2, "0");
    var year = dateObj.getUTCFullYear();
    return year + "-" + month + "-" + day;
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "in_progress":
        return { backgroundColor: "yellow" };
      case "failed":
        return { backgroundColor: "red" };
        return;
      case "completed":
        return { backgroundColor: "green" };
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        ...styles.row,
        backgroundColor: "#FFE0BA",
        justifyContent: "space-between",
      }}
    >
      <Text>{formatDate(item.creation_date)}</Text>
      <Text>$ {item.amount}</Text>
      <Text style={getStatusColor(item.status)}>{item.status}</Text>
    </View>
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchItems().then((json) => {
        setItems(json);
      });
    }
    return () => (isMounted = false);
  });
  return (
    <>
      <View style={styles.container}>
        {items === undefined ? (
          <Text style={styles.title}>Aun no has hecho retiros</Text>
        ) : (
          <>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  ...styles.row,
                  backgroundColor: "#E99125",
                  justifyContent: "space-between",
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              >
                <Text style={styles.titulo}>Fecha</Text>
                <Text style={styles.titulo}> Monto</Text>
                <Text style={styles.titulo}> Status</Text>
              </View>
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
              <View
                style={{
                  ...styles.row,
                  backgroundColor: "#FFE0BA",
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              ></View>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const Solreti = () => {
  const [cantidad, setCantidad] = useState(100.0);
  const { tienda } = useContext(TiendaContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { navigation } = useNavigation();

  const solicitarRetiro = async () => {
    setLoading(true);
    setShowModal(true);
    setMessage("Solicitando retiro");
    const solicitud = await fetch(
      "http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v2/openpay/payout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: cantidad, id_tienda: tienda.id }),
      }
    );
    const resp = await solicitud.json();
    console.log(resp);
    if (resp.error) {
      console.log(resp.error);
      setLoading(false);
      setMessage(
        "Ocurrió un error con la solicitud de tu retiro, intenta mas tarde"
      );
      return;
    }
    console.log(resp);
    setLoading(false);
    setMessage(
      "Solicitud exitosa! Los cambios se verán reflejados en tu cuenta bancaria en 24 horas"
    );
    return;
  };

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.card2, styles.shadow]}>
          <Text style={styles.titulo}>Cantidad</Text>
          <NumericInput
            onChange={(value) => setCantidad(value)}
            rounded
            value={cantidad}
            valueType="real"
            totalWidth={300}
            totalHeight={50}
            textColor="#B0228C"
            iconStyle={{ color: "white" }}
            rightButtonBackgroundColor="#C0D5E1"
            leftButtonBackgroundColor="#C0D5E1"
          />
        </View>
        <TouchableOpacity
          style={styles.agregarNuevoBtn}
          onPress={() => solicitarRetiro()}
        >
          <Text style={styles.textAgregarNuevoBtn}>Solicitar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Cancelando")}>
          <Text style={styles.titulo2}>Cancelar</Text>
        </TouchableOpacity>
        <LoadingModal
          loading={loading}
          show={showModal}
          setShow={setShowModal}
          message={message}
        ></LoadingModal>
      </View>
    </>
  );
};

const getFormattedDate = (today) => {
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + "-" + mm + "-" + dd;
};

const VentaDiaria = () => {
  const { tienda } = useContext(TiendaContext);
  const [items, setItems] = useState();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [shortDate, setShortDate] = useState(getFormattedDate(date));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate);
    const fecha = getFormattedDate(currentDate);
    setShortDate(fecha);
  };

  const showMode = () => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  useEffect(() => {
    let isMounted = true;
    console.log(shortDate);
    if (isMounted) {
      fetchItems().then((json) => {
        if (json !== undefined) {
          setItems(json.ventas);
        }
      });
    }
    return () => (isMounted = false);
  }, [shortDate]);

  const fetchItems = async () => {
    const items = await fetch(
      `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/ventas/${tienda.id}?date=%22${shortDate}%22`
    );
    const json = await items.json();
    console.log(json);
    return json;
  };

  const RenderVenta = ({ item }) => (
    <View
      style={{
        ...styles.row,
        backgroundColor: "#FFE0BA",
        justifyContent: "space-between",
      }}
    >
      <Text>{item.id}</Text>
      <Text>{item.id_usuario}</Text>
      <Text>$ {item.amount}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.shadow,
          backgroundColor: "orange",
          padding: 10,
          borderRadius: 20,
        }}
        onPress={showDatepicker}
        title="Show date picker!"
      >
        <Text style={{ ...styles.titulo, color: "white" }}>
          {shortDate.toString()}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.card}>
        {items && items.length > 0 ? (
          <>
            <View
              style={{
                ...styles.row,
                backgroundColor: "#FFE0BA",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>ID_orden</Text>
              <Text style={{ fontWeight: "bold" }}>Usuario</Text>
              <Text style={{ fontWeight: "bold" }}>Cantidad</Text>
            </View>
            <FlatList
              data={items}
              renderItem={RenderVenta}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <Text style={styles.titulo}>
            No se han registrado ventas en esta fecha
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default VentasStack;
