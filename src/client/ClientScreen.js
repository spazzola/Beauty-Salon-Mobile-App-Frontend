import React, { useContext, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/ClientContext';
import ClientItem from './ClientItem';
import { globalBackground } from '../../GlobalStyles';
import { useFonts } from 'expo-font';
import { buttonIcons } from '../icons/Icons';


const ClientScreen = ({ navigation }) => {
    const { state, addClient, getClients } = useContext(Context);
    const [loaded] = useFonts({
        KalamRegular: require('../../assets/fonts/Kalam-Regular.ttf'),
        KalamBold: require('../../assets/fonts/Kalam-Bold.ttf'),
    });

    useEffect(() => {
        getClients();

        const listener = navigation.addListener('didFocus', () => {
            getClients();
        });

        return () => {
            listener.remove();
        };
    }, []);

    if (!loaded) {
        return null;
    }

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
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Client', { id: item.id })}>
                            <ClientItem client={item}></ClientItem>
                        </TouchableOpacity>
                    );
                }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('ClientAdd')}>
                <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'addClient')).uri} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    button: {
        width: 160,
        height: 80
    }
})

export default ClientScreen;