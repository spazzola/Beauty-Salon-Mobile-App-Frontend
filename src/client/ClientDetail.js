import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { Context } from './context/ClientContext';
import { globalBackground, button, buttonWrapper, buttonText, detailTitle, detailParagraph, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import BaseSpinner from '../base_components/BaseSpinner';


const ClientDetail = ({ navigation }) => {
    const { state, deleteClient, sendBelated } = useContext(Context);
    const [showSpinner, setShowSpinner] = useState(false);

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
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]} selectable> {client.phoneNumber}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.belatedCounter}</Text>
                    </View>
                </View>

                <View style={buttonWrapper}>
                    <TouchableOpacity style={[button, { width: 200 }]} onPress={() => {
                        Alert.alert(
                            "Dodawanie spóźnienia",
                            "Czy napewno chcesz dodać spóźnienie?",
                            [
                                {
                                    text: "Nie",
                                    style: "cancel"
                                },
                                {
                                    text: "Tak", onPress: async () => {
                                        setShowSpinner(!showSpinner);
                                        sendBelated(client.id);
                                        setShowSpinner(false);
                                    }
                                }
                            ]
                        );
                    }}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj spóźnienie</Text>
                    </TouchableOpacity>
                </View>
                <View style={buttonWrapper}>
                    <TouchableOpacity style={button} onPress={() => navigation.navigate('ClientEdit', { id: navigation.getParam('id') })}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Edytuj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button} onPress={() => {
                        Alert.alert(
                            "Usuwanie klienta",
                            "Czy napewno chcesz usunąć klienta?",
                            [
                                {
                                    text: "Nie",
                                    style: "cancel"
                                },
                                {
                                    text: "Tak", onPress: async () => {
                                        setShowSpinner(!showSpinner);
                                        deleteClient(client.id);
                                        navigation.navigate('Clients');
                                        setShowSpinner(!showSpinner);
                                    }
                                }
                            ]
                        );
                    }}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usuń</Text>
                    </TouchableOpacity>
                </View>
                {showSpinner ?
                    <BaseSpinner />
                    : null}
            </View>

        </>
    );
}

ClientDetail.navigationOptions = {
    title: 'Klient',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

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