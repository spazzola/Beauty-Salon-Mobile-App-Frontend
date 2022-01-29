import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Context } from './context/UserContext';
import { globalBackground, detailTitle, detailParagraph, button, buttonWrapper, buttonText, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import { buttonIcons } from '../icons/Icons';
import BaseSpinner from '../base_components/BaseSpinner';
import ScrollableText from '../base_components/ScrollableText';


const UserDetail = ({ navigation }) => {
    const { state, deleteUser } = useContext(Context);
    const [showSpinner, setShowSpinner] = useState(false);

    const user = state.find((user) => user.id === navigation.getParam('id'));

    return (
        <>
            <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
                <View style={[globalBackground, { height: '35%', flexDirection: 'row', justifyContent: 'center', maxWidth: '100%' }]}>
                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Imię:</Text>
                            <ScrollableText text={user.name} />
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nazwisko:</Text>
                            <ScrollableText text={user.surname} />
                        </View>

                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nr.kom:
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {user.phoneNumber}</Text>
                        </Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Login:
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {user.login}</Text>
                        </Text>
                    </View>
                </View>

                <View style={buttonWrapper}>
                    <TouchableOpacity style={button} onPress={() => navigation.navigate('UserEdit', { id: navigation.getParam('id') })}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Edytuj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button} onPress={() => {
                        Alert.alert(
                            "Usuwanie pracownika",
                            "Czy napewno chcesz usunąć pracownika?",
                            [
                                {
                                    text: "Nie",
                                    style: "cancel"
                                },
                                {
                                    text: "Tak", onPress: async () => {
                                        setShowSpinner(!showSpinner);
                                        deleteUser(user.id);
                                        navigation.navigate('Users');
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

UserDetail.navigationOptions = {
    title: 'Pracownik',
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

export default UserDetail;