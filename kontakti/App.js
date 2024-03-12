import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data);
      }
    }
  }

  const renderContacts = ({ item }) => (
    <Text style={styles.contactItem}>
      {`${item.firstName} ${item.lastName} - ${item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'Missing phone number'}`}
    </Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <FlatList
          data={contacts}
          renderItem={renderContacts}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="GET CONTACTS" onPress={getContacts} ></Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 30,
    marginLeft: '25%',
    width: '50%',
  },
});