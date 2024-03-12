import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';

export default function App() {

 const [text, setText] = useState('');

 const textToSpeech = () => {
    Speech.speak(text);
    console.log('TTS: ', text);
 };

 return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder='Write your text here.'
        placeholderTextColor="#999"
        borderBottomColor="#000"
        borderBottomWidth={1}
      />

      <Button title='TTS' onPress={textToSpeech} />
      <StatusBar style="auto" />
    </View>
 );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 },
 input: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
 },
});
