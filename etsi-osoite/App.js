import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const API_KEY = '';
const GEOCODE_API_URL = 'https://geocode.maps.co/search';

export default function App() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleShowMap = async () => {
    try {
      setCoordinates(null);
      const response = await fetch(`${GEOCODE_API_URL}?q=${address}&api_key=${API_KEY}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
        Alert.alert('Address not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Show" onPress={handleShowMap} />
      {coordinates && (
        <MapView style={styles.map} initialRegion={{
          ...coordinates,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <Marker coordinate={coordinates} />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  map: {
    width: '100%',
    height: '50%',
    marginTop: 20,
  },
});