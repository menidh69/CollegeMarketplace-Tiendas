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
    const order = getOrdenes(it.result)
    setItems(order)
    return
}

  const entregar = async (id_orden)=>{
    const data = await fetch(`http://college-marketplace.eba-kd3ehnpr.us-east-2.elasticbeanstalk.com/api/v1/tiendas/entregar/${id_orden}`,
    {
      method: "PUT",
      headers: {"Content-Type":"application/json"}
  });  
  const it = await data.json();
  if(data.status==400){
    console.log("Err:" + data)
  }else{
    console.log(it);
    setItems(list.filter(item => item.id !== id_orden));
  }
  }
  console.log(items)
  const getOrdenes = (data)=>{
    let ordenesTodas = []
    let ordenes = []
    data.map(item=>{
      if(!ordenes.includes(item.id))
        ordenes.push(item.id)
    });
    ordenes.map(orden=>{
      let orden_items = []
      data.map(item=>{
        if(orden==item.id){
          orden_items.push(item)
        }
      })
      ordenesTodas.push(orden_items)
    })
    return ordenesTodas
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pedidos pendientes</Text>
      {((items.length>0))? 
      <FlatList
        data={items}
        keyExtractor={item => item[0].id}
        renderItem={({ item }) => (
          <View style={{...styles.listItem, flex:1, flexDirection:'column'}}>
            <Text style={styles.listItemText}>Orden: {item[0].id}: {item.nombre} {item.apellidos} </Text>
            <Text style={styles.listItemText}>Cliente: {item[0].nombre} {item[0].apellidos} </Text>
            <View style={{flex:1}}>
            {item.map(producto=>(
              <Text>{producto.nombre_producto}</Text>
        ))}
        </View>
          <TouchableOpacity text="Ver" onPress={() => entregar(item[0].id)} style={styles.button}> 
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
    flexWrap:'wrap',
    padding: 20,
    alignItems: 'center',
    width: '100%',
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
