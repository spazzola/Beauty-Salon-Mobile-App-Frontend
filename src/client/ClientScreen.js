import React, { useContext, useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Context } from './context/ClientContext';
import { Context as AppointmentContext } from '../appointment/context/AppointmentContext';
import ClientItem from './ClientItem';
import { globalBackground, button, buttonText, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import SearchBar from './utility/SearchBar';
import BaseSpinner from '../base_components/BaseSpinner';
import { useFonts } from 'expo-font';
import { buttonIcons } from '../icons/Icons';



function filterList(clients, name) {
    let resultList = [];
    if (name === '') {
        return clients;
    } else {
        clients.filter(client => {
            return client.name.includes(name) || client.surname.includes(name);
        }).map(filteredClient => resultList.push(filteredClient));

        return resultList;
    }
}

const ClientScreen = ({ navigation }) => {
    const { state, addClient, getClients } = useContext(Context);
    const appointmentContext = useContext(AppointmentContext);
    const [name, setName] = useState('')
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        getClients();
        const listener = navigation.addListener('didFocus', () => {
            getClients();
        });

        return () => {
            listener.remove();
        };
    }, []);

    useEffect(() => {
        filterList(state, name);
    }, [name])

    return (
        <>
            <View style={[globalBackground, styles.container]}>
                <SearchBar
                    term={name}
                    onTermChange={newName => setName(newName)}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filterList(state, name).sort((a, b) => {
                        let fa = a.name.toLowerCase(),
                            fb = b.name.toLowerCase(),
                            fasurname = a.surname.toLowerCase(),
                            fbsurname = b.surname.toLowerCase();

                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        if (fa < fb || fasurname < fbsurname) {
                            return -1
                        }
                        return 0
                        //return a.name.localeCompare(b.name); //using String.prototype.localCompare()
                    })}
                    keyExtractor={client => client.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={async () => {
                                setShowSpinner(!showSpinner);
                                response = await appointmentContext.getIncomingAppointments(item.id);
                                navigation.navigate('Client', { id: item.id })
                                setShowSpinner(false);
                            }}>
                                <ClientItem client={item} index={index}></ClientItem>
                            </TouchableOpacity>
                        );
                    }}
                />
                <TouchableOpacity style={[styles.wrapper, button]} onPress={() => navigation.navigate('ClientAdd')}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj klienta</Text>
                </TouchableOpacity>
            </View>
            {showSpinner ?
                <BaseSpinner />
                : null}
        </>
    );
}

ClientScreen.navigationOptions = {
    title: 'Klienci',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    wrapper: {
        position: 'absolute',
        top: '87%',
        left: '50%',
        zIndex: 1,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    },
})

export default ClientScreen;