import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClientItem = ({ client }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}> {client.name} {client.surname}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        marginBottom: 3,
    },
    paragraph: {
        fontSize: 30,
        flex: 1,
        backgroundColor: 'grey'
    }
});


export default ClientItem;