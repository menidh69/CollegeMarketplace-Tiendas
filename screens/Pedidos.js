import React,{useEffect, useState} from 'react'
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity, FlatList } from 'react-native';



const data = [
  { id: '13', nombre: 'Pedido #', user: 'Javier', desc: 'salchipapas'},
  { id: '22', nombre: 'Pedido #', user: 'Victor', desc: 'dogo' },
  { id: '53', nombre: 'Pedido #', user: 'Manuel', desc: 'dogomomia' },
  { id: '94', nombre: 'Pedido #', user: 'Alondra', desc: 'chetos' },
  { id: '532', nombre: 'Pedido #', user: 'Francisco', desc: 'Tostitos con queso' },
  { id: '14', nombre: 'Pedido #', user: 'Centeno', desc: 'onigiri' },
  { id: '3', nombre: 'Pedido #', user: 'Castillo', desc: 'papaboneless' },
  { id: '98', nombre: 'Pedido #', user: 'Duarte', desc: 'una orden de burritos de carne' },
];

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedidos pendientes</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.nombre}{item.id}: {item.user} </Text>
          <TouchableOpacity text="Ver" onPress={() =>
        { alert(item.desc);}} style={styles.button}> 
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Ver
            </Text>
        </TouchableOpacity>

      
        
        </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B1D8EE',
    alignItems: 'center'
  },

  titleText: {
          fontSize: 46,
          fontWeight: "bold",
          textAlign:"left",
          marginBottom: 30,
          marginTop:30,
          color: "white",
          textAlign: 'center'
        },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap:'wrap',
    padding: 20,
    alignItems: 'center',
    width: '95%',
    justifyContent: 'space-between'
  },
  listItemText: {
    fontSize: 18
  },
  button:{
            borderRadius: 20,
            backgroundColor: "#E99125",
            height: 40,
            width: 110,
            color: "#FFFFFF",
            marginTop: 10,
            textAlign: 'center',
            paddingTop: 5

        }
});
