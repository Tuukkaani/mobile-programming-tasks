import React, { useState } from 'react';
import { Button, View, StyleSheet, TextInput, Text, FlatList } from 'react-native';

export default function App() {

  const [firstTextField, setFirstTextField] = useState("");
  const [secondTextField, setSecondTextField] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState("");

  const buttonPressed = (operation) => {
    if (operation === '+') {
      setResult("Result: " + (parseFloat(firstTextField) + parseFloat(secondTextField)).toString());
    } else if (operation === '-') {
      setResult("Result: " + (parseFloat(firstTextField) - parseFloat(secondTextField)).toString());
    }

    const historyEntry = `${firstTextField} ${operation} ${secondTextField} = ${result}`;
    setHistory([...history, historyEntry]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{result}</Text>
      <TextInput 
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        keyboardType="numeric"
        onChangeText={firstTextField => setFirstTextField(firstTextField)} value={firstTextField} 
      />
      <TextInput 
        style={{width: 200, borderColor: 'gray', borderWidth: 1}}
        keyboardType="numeric"
        onChangeText={secondTextField => setSecondTextField(secondTextField)} value={secondTextField} 
      />
      <View style={styles.buttonContainer}>
        <Button 
          onPress={() => buttonPressed('+')} 
          title="+" 
          style={styles.button} 
        />
        <View style={styles.gap}></View>
        <Button 
          onPress={() => buttonPressed('-')} 
          title="-" 
          style={styles.button} />
      </View>

      <FlatList
        data={history}
        renderItem={({ item }) => <Text>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },

  gap: {
    marginRight: 20,
  },

  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },

  button: {

  },
});


