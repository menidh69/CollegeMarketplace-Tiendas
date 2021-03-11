import React,{useEffect, useState} from 'react'
import { TextInput, Text, View, StyleSheet, Button, Touchable, TouchableOpacity, FlatList } from 'react-native';

export default function Editinfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit info</Text>
     
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
