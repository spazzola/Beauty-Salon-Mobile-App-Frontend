import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/SettingsContext';
import { headerBackgroundColor, headerTitleColor, buttonWrapper, button, buttonText, globalBackground } from '../../../GlobalStyles';

const VacationScreen = ({ navigation }) => {

    return <>
        <View style={{ flexDirection: 'row' }}>
            <View style={[styles.nameContainer, button, styles.nameButton,  { borderRightColor: globalBackground.backgroundColor, borderRightWidth: 1 }]}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Nadchodzące</Text>
            </View>
            <View style={[styles.nameContainer, button, styles.nameButton]}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Przeszłe</Text>
            </View>
        </View>
        <TouchableOpacity style={[styles.wrapper, button]} onPress={() => navigation.navigate('VacationAdd')}>
            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj urlop</Text>
        </TouchableOpacity>
    </>
}

VacationScreen.navigationOptions = {
    title: 'Urlop',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({
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
    nameButton: {
        flex: 6,
        borderRadius: 0
    }
})

export default VacationScreen;