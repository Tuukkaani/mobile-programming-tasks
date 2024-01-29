import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';

export default function App() {

  const [listItem, setListItem] = useState("");
  const [shoppingList, setShoppingList] = useState([]);

  const addItemToList = () => {
    if(listItem.trim() !== "") {
      setShoppingList([...shoppingList, listItem]);
      setListItem("");
    }
  }

  const clearList = () => {
    setShoppingList([]);
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        keyboardType="default"
        onChangeText={listItem => setListItem(listItem)} value={listItem} 
      />

      <View style={styles.buttonContainer}>
        <Button 
          onPress={() => addItemToList()} 
          title="Add" 
          style={styles.button} 
        />
        <View style={styles.gap}></View>
        <Button 
          onPress={() => clearList()} 
          title="Clear" 
          style={styles.button} />
      </View>

      <Text style={styles.shoppingListText}>{'Shopping List'}</Text>

      <FlatList
        data={shoppingList}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 350,
  },

  gap: {
    marginRight: 20,
  },

  shoppingListText: {
    marginTop: 50,
    paddingBottom: 25,
    fontSize: 20,
    color: 'blue',
    fontWeight: '800',
  },


  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
});
