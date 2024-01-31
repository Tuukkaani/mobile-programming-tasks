import React, { useState } from 'react';
import { Button, View, StyleSheet, TextInput, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CalculatorScreen = ({ navigation }) => {

  const [firstTextField, setFirstTextField] = useState("");
  const [secondTextField, setSecondTextField] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const buttonPressed = (operation) => {
    let calculation;

    if (operation === '+') {
      calculation = parseFloat(firstTextField) + parseFloat(secondTextField);
    } else if (operation === '-') {
      calculation = parseFloat(firstTextField) - parseFloat(secondTextField);
    }

    setResult(calculation.toString());

    const historyEntry = `${firstTextField} ${operation} ${secondTextField} = ${calculation}`;
    setHistory([...history, historyEntry]);
  };

  const historyPressed = () => {
    navigation.navigate('HistoryScreen', { history });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{"Result: " + result}</Text>
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
         <View style={styles.gap}></View>
        <Button 
          onPress={() => historyPressed()} 
          title="History" 
          style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default CalculatorScreen;
