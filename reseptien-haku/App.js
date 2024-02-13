import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(responseJson => setRecipes(responseJson.meals))
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  const renderRecipes = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
      <Image
        source={{ uri: item.strMealThumb }}
        style={{ width: 100, height: 100, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.strMeal}</Text>
    </View>
  );

  const listSeparator = () => (
    <View
      style={{
        height: 1,
        width: '80%',
        backgroundColor: '#CED0CE',
        marginLeft: '10%'
      }}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{ flex: 6 }}>
        <FlatList
          style={{ marginLeft: '5%' }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderRecipes}
          data={recipes}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
      <View style={{ flex: 1 }}>
        <TextInput
          style={{ fontSize: 18, width: 200 }}
          placeholder="Search for recipe"
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button title="Find" onPress={getRecipes} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});