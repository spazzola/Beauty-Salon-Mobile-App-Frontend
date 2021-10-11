import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import { Context } from './context/ClientContext';
import ClientItem from './ClientItem';

const ClientScreen = ({ navigation }) => {
    const { state, addClient, getClients } = useContext(Context);

    useEffect(() => {
        getClients();

        const listener = navigation.addListener('didFocus', () => {
            getClients();
        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <Text>Client screen !!! {state.length}</Text>
            <Button title="Dodaj klienta" onPress={() => navigation.navigate('ClientAdd')}/>
            <FlatList 
                data={state}
                keyExtractor={client => client.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Client', { id: item.id })}>
                            <ClientItem client={item}></ClientItem>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default ClientScreen;