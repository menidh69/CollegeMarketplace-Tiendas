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
import { useNavigation } from "@react-navigation/native";
import { ProductoContext } from "../ProductoContext";
import { useForm } from "react-hook-form";
import ErrorModal from "../components/ErrorModal";

const AgregarProducto = ({ navigation }) => {
    const { datos, setDatos } = useContext(ProductoContext);
    const [categoria, setCategoria] = useState("1");
    const [show, setShow] = useState(false);
    const onSubmit = (data) => {
        if (
            data.nombre == "" ||
            data.nombre == undefined ||
            data.precio == "" ||
            data.precio == undefined
        ) {
            setShow(true);
            return;
        } else {
            setDatos({
                ...datos,
                nombre: data.nombre,
                precio: data.precio,
                id_categoria: data.categoria,
                descripcion: data.descripcion,
            });
            console.log(datos);
            console.log(data);
            console.log(data.categoria);
            navigation.navigate("ImagenProducto");
        }
    };

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register("id_tienda");
        register("nombre");
        register("precio");
        register("categoria");
        register("url_imagen");
        register("descripcion");
    }, [register]);

    return (
        <ScrollView contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#C0D5E1",
            flex: 1,
        }}>
            <ErrorModal
                message={"Llena todos los campos"}
                show={show}
                setShow={setShow}
            />
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
                    data-openpay-card="card_number"
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
                />
            </View>

            <Text>Categoría:</Text>
            <View style={styles.pickerView}>
                <Picker
                    selectedValue={categoria}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={(value, itemIndex) => {
                        setValue("categoria", value);
                        setCategoria(value);
                    }}
                    style={{ height: 50, width: "70%" }}
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
                />
            </View>

            <TouchableOpacity
                style={styles.guardarBtn}
                onPress={handleSubmit(onSubmit)}
            >
                <Text style={styles.guardarText}>Siguiente</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C0D5E1",
        flex: 1,
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
    pickerItem: {
        width: 200,
        height: 132,
        backgroundColor: "#C0D5E1",
        borderColor: "black",
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
            },
    picker: {
        flex: 1,
        backgroundColor: "#C0D5E1",
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

export default AgregarProducto;
