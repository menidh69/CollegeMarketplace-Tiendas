import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext, ContexProvider } from "../UserContext";
import AsyncStorage from "@react-native-community/async-storage";
import { NewUserContext } from "../NewUserContext";
import { TiendaContext } from "../TiendaContext";
import { isEmptyNull } from "../functions/formValidation";

import ErrorModal from "../components/ErrorModal";
import MapView, { Marker } from 'react-native-maps';

const Stack = createStackNavigator();

const Map = () => {

    const { tienda, setTienda } = useContext(TiendaContext);

    const navigation = useNavigation();
    
    const [marker, setMarker] = useState({
        coordinate: {
            latitude: tienda.lat,
            longitude: tienda.lng
        }
    });

    if(marker.coordinate.latitude == 0 || marker.coordinate.longitude == 0 ){
        marker.coordinate.latitude = 29.083164243291787;
        marker.coordinate.longitude = -110.962082842638;
    } 


    const guardar = async () => {
        try {
            const body = {
                lat: marker.coordinate.latitude,
                lng: marker.coordinate.longitude
            };
            const response = await fetch(
                `http://college-mp-env.eba-kwusjvvc.us-east-2.elasticbeanstalk.com/api/v1/tiendas/${tienda.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                }).then(async (resp) => {
                    const result = await resp.json();
                    if (result.error) {
                        console.log(result.error);
                        return;
                    } else {
                        console.log(result);
                        setTienda({...tienda, lat: marker.coordinate.latitude, lng: marker.coordinate.longitude})
                        return navigation.reset({
                            routes: [{ name: "Mitienda" }],
                        });
                    }
                });
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.mapa}
                initialRegion={{
                    latitude: 29.083164243291787,
                    longitude: -110.962082842638,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.0090,
                }}
            >
                <Marker draggable
                    coordinate={marker.coordinate}
                    onDragEnd={(e) => setMarker({ coordinate: e.nativeEvent.coordinate })}
                />
            </MapView>

            <TouchableOpacity
                style={styles.editinfo}
                onPress={() => guardar()}
            >
                <Text style={styles.edtext}>Guardar</Text>
            </TouchableOpacity>


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
    mapa: {
        width: '100%',
        height: '80%',

    },
    editinfo: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6dcf9b",
        marginTop: 20,
        width: "50%",
        marginLeft: 15,
    },
    edtext: {
        fontWeight: "bold",
        color: "#FFF",
    },
});

export default Map;
