import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from '../../axios-config';
import { Context } from './context/ClientContext';
import { Context as AuthContext } from '../signin/context/AuthContext';
import { Context as AppointmentContext } from '../appointment/context/AppointmentContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalBackground, button, buttonWrapper, buttonText, detailTitle, detailParagraph, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import BaseSpinner from '../base_components/BaseSpinner';
import ScrollableText from '../base_components/ScrollableText';
import IncomingAppointment from './IncomingAppointment';


const ClientDetail = ({ navigation }) => {
    const { state, deleteClient, sendBelated } = useContext(Context);
    const appointmentContext = useContext(AppointmentContext);
    const [showSpinner, setShowSpinner] = useState(false);
    const authConext = useContext(AuthContext);


    const client = state.find((client) => client.id === navigation.getParam('id'));

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {

        });

        return () => {
            listener.remove();
        };
    }, []);

    return (
        <>
            <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
                <View style={[globalBackground, { height: '25%', flexDirection: 'column', justifyContent: 'center', maxWidth: '100%' }]}>
                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Imię:</Text>
                            <ScrollableText text={client.name} />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nazwisko:</Text>
                            <ScrollableText text={client.surname} />
                        </View>

                        {authConext.state.role === 'ADMIN' ?
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nr.kom:
                                <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]} selectable> {client.phoneNumber}</Text>
                            </Text>
                            :
                            null
                        }
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Opuszczone wizyty:
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.belatedCounter}</Text>
                        </Text>
                    </View>
                    {/* <View>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.name}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.surname}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]} selectable> {client.phoneNumber}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {client.belatedCounter}</Text>
                    </View> */}
                </View>

                <View style={{ flexDirection: 'column', alignSelf: 'center', width: '100%', padding: 10 }}>
                    <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nadchodzące wizyty:</Text>
                    <FlatList
                        data={appointmentContext.state.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <IncomingAppointment navigation={navigation} appointment={item} key={index} />
                        )}
                    />
                </View>

                <View style={[buttonWrapper, { marginTop: '15%' }]}>
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