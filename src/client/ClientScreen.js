import React, { useContext, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { Context } from './context/ClientContext';
import ClientItem from './ClientItem';
import { globalBackground, button, buttonText } from '../../GlobalStyles';
import { useFonts } from 'expo-font';
import { buttonIcons } from '../icons/Icons';


const ClientScreen = ({ navigation }) => {
    const { state, addClient, getClients } = useContext(Context);
    // const [loaded] = useFonts({
    //     KalamRegular: require('../../assets/fonts/Kalam-Regular.ttf'),
    //     KalamBold: require('../../assets/fonts/Kalam-Bold.ttf'),
    // });

    useEffect(() => {
        getClients();

        const listener = navigation.addListener('didFocus', () => {
            getClients();
        });

        return () => {
            listener.remove();
        };
    }, []);

    // if (!loaded) {
    //     return null;
    // }

    return (
        <View style={[globalBackground, styles.container]}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={state.sort((a, b) => {
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
                        <TouchableOpacity onPress={() => navigation.navigate('Client', { id: item.id })}>
                            <ClientItem client={item} index={index}></ClientItem>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity style={[styles.wrapper, button]} onPress={() => navigation.navigate('ClientAdd')}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj klienta</Text>
            </TouchableOpacity>
        </View>
    );
}

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