import React,{useEffect, useState} from 'react'
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity, FlatList } from 'react-native';



const data = [
  { id: '13', nombre: 'Pedido #', user: 'Javi2er', desc: 'salchipapas'},
  { id: '22', nombre: 'Pedido #', user: 'Victor', desc: 'dogo' },
  { id: '53', nombre: 'Pedido #', user: 'Manuel', desc: 'dogomomia' },
  { id: '94', nombre: 'Pedido #', user: 'Alondra', desc: 'chetos' }
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
            <Text style={styles.listItemText}>{item.nombre}{item.id}: {item.user}</Text>
              <TouchableOpacity onPress={() => { alert(item.desc);}}><Text>Ver</Text></TouchableOpacity>

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
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  listItemText: {
    fontSize: 18
  },
  button:{
            color: "#FFFFFF",

        }
});
