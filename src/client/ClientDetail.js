import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Context } from './context/ClientContext';
import { globalBackground } from '../../GlobalStyles';
import { buttonIcons } from '../icons/Icons';

const ClientDetail = ({ navigation }) => {
    const { state, deleteClient } = useContext(Context);

    const client = state.find((client) => client.id === navigation.getParam('id'));

    return (
        <>
            <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
                <View style={[globalBackground, { height: '35%', flexDirection: 'row', justifyContent: 'center', maxWidth: '100%' }]}>

                    <View>
                        <Text style={styles.title}>Imię:</Text>
                        <Text style={styles.title}>Nazwisko:</Text>
                        <Text style={styles.title}>Nr.kom:</Text>
                        <Text style={styles.title}>Ilość spóźnień:</Text>
                    </View>

                    <View>
                        <Text style={styles.paragraph}> {client.name}</Text>
                        <Text style={styles.paragraph}> {client.surname}</Text>
                        <Text style={styles.paragraph}> {client.phoneNumber}</Text>
                        <Text style={styles.paragraph}> {client.belatedCounter}</Text>
                    </View>
                </View>

                <View style={[styles.buttonsContainer, { flexDirection: 'row' }]}>
                    <TouchableOpacity onPress={() => navigation.navigate('ClientEdit', { id: navigation.getParam('id') })}>
                        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'edit')).uri} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Clients')
                        deleteClient(client.id)
                    }}>
                        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'deleteIcon')).uri} />
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 10,
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'KalamRegular'
    },
    title: {
        marginTop: 10,
        fontSize: 25,
        fontFamily: 'KalamBold',
        textAlign: 'right'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    },
    button: {
        width: 160,
        height: 80
    }
});

export default ClientDetail;