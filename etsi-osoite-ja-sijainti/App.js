import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const API_KEY = '';
const GEOCODE_API_URL = 'https://geocode.maps.co/search';

export default function App() {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission denied');
        }
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error('Error getting current location:', error);
        Alert.alert('Error', 'Failed to get current location.');
      }
    })();
  }, []);

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
      {(currentLocation || coordinates) && (
        <MapView style={styles.map} initialRegion={{
          ...currentLocation,
          ...coordinates,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}>
          {currentLocation && <Marker coordinate={currentLocation} title="Current Location" />}
          {coordinates && <Marker coordinate={coordinates} title="Searched Location" />}
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