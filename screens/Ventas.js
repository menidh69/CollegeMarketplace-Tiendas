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
        <TouchableOpacity style={[styles.buttonBlock, styles.shadow]}>
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
  card: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 30,
    marginVertical: 20,
    padding: 20,
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

export default VentasStack;
