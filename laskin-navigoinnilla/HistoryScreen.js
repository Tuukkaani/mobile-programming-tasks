import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const HistoryScreen = ({ route }) => {

    const { history } = route.params;

    return (
        <View style={styles.container}>
            <Text>{"History"}</Text>
            <FlatList
                data={history}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HistoryScreen;