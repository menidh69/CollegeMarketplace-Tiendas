import React,{useEffect, useState, useContext} from 'react'
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity, FlatList } from 'react-native';
import {TiendaContext} from '../TiendaContext'


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
  const [items, setItems] = useState([])
  const {tienda} = useContext(TiendaContext);

  useEffect(()=>{
    fetchitems();
    const interval=setInterval(()=>{
      fetchitems();
      console.log("new request");
     },10000)
       
       
     return()=>clearInterval(interval)
  }, [])

  const show = ()=>{
    console.log(items)
  }

  const fetchitems = async (id) => {
    const data = await fetch(`http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/tiendas/pedidosPendientes/${tienda.id}`);
    const it = await data.json();
    setItems(it.result)
    return
}

  const entregar = async (id_orden)=>{
    const body = "";
    const data = await fetch(`http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/tiendas/entregar/${id_orden}`,
    {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(body)
  });  
  if(!data.status==200){
    console.log("Err:" + data)
  }else{
    const it = await data.json();
    console.log(it);
    setItems(list.filter(item => item.id !== id_orden));
  }
  }
  console.log(items)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedidos pendientes</Text>
      {((items.length>0))? 
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.nombre_producto}: {item.nombre} {item.apellidos} </Text>
          <TouchableOpacity text="Ver" onPress={() => entregar(item.id)} style={styles.button}> 
            <Text style={{"color": "#FFFFFF", "textAlign": "center", "fontSize": 20}}>
                Entregar
            </Text>
        </TouchableOpacity>

      
        
        </View>

        )}
      />
      :
      <Text style={{fontSize: 30, margin: 40, textAlign: "center"}}>No tienes pedidos pendientes</Text>
      }
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
    fontSize: 18,
    fontWeight: "bold"
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
