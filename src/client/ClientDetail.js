import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/ClientContext';

const ClientDetail = ({ navigation }) => {
    const { state, deleteClient } = useContext(Context);

    const client = state.find((client) => client.id === navigation.getParam('id'));

    return (
        <View>
            <Text style={styles.paragraph}><Text style={styles.title}>Imię: </Text> {client.name}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Nazwisko: </Text> {client.surname}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Nr.kom: </Text> {client.phoneNumber}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Ilość spóźnień: </Text> {client.belatedCounter}</Text>
            <View style={styles.buttonsContainer}>
                <Button title="Edytuj" onPress={() => navigation.navigate('ClientEdit', { id: navigation.getParam('id') })} />
                <Button title="Usuń" onPress={() => {
                    navigation.navigate('Clients')
                    deleteClient(client.id)
                    }}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    buttonsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    }
});

export default ClientDetail;