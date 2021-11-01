import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Context } from './context/UserContext';
import { globalBackground, detailTitle, detailParagraph, button, buttonWrapper, buttonText } from '../../GlobalStyles';
import { buttonIcons } from '../icons/Icons';

const UserDetail = ({ navigation }) => {
    const { state, deleteUser } = useContext(Context);

    const user = state.find((user) => user.id === navigation.getParam('id'));

    return (
        <>
            <View style={{ height: '100%', backgroundColor: globalBackground.backgroundColor }}>
                <View style={[globalBackground, { height: '35%', flexDirection: 'row', justifyContent: 'center', maxWidth: '100%' }]}>
                    <View>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Imię:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nazwisko:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nr.kom:</Text>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Login:</Text>
                    </View>

                    <View>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {user.name}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {user.surname}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {user.phoneNumber}</Text>
                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {user.login}</Text>
                    </View>
                </View>

                <View style={buttonWrapper}>
                    <TouchableOpacity style={button} onPress={() => navigation.navigate('UserEdit', { id: navigation.getParam('id') })}>
                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Edytuj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button} onPress={() => {
                        navigation.navigate('Users')
                        deleteUser(user.id)
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

export default UserDetail;