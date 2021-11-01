import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Context } from './context/ClientContext';
import { globalBackground, button, buttonWrapper, buttonText, detailTitle, detailParagraph } from '../../GlobalStyles';

const ClientDetail = ({ navigation }) => {
    const { state, deleteClient } = useContext(Context);

    const client = state.find((client) => client.id === navigation.getParam('id'));

    return (
        <>
            <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
                <View style={[globalBackground, { height: '35%', flexDirection: 'row', justifyContent: 'center', maxWidth: '100%' }]}>

                    <View>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Imię:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nazwisko:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nr.kom:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Ilość spóźnień:</Text>
                    </View>

                    <View>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.name}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.surname}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.phoneNumber}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.belatedCounter}</Text>
                    </View>
                </View>

                <View style={buttonWrapper}>
                    <TouchableOpacity style={button} onPress={() => navigation.navigate('ClientEdit', { id: navigation.getParam('id') })}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Edytuj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button} onPress={() => {
                        navigation.navigate('Clients')
                        deleteClient(client.id)
                    }}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usuń</Text>
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