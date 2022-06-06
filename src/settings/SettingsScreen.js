import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/SettingsContext';
import { headerBackgroundColor, headerTitleColor, buttonWrapper, button, buttonText } from '../../GlobalStyles';

const SettingsScreen = ({ navigation }) => {

    return <>
        <View style={buttonWrapper}>
            <TouchableOpacity style={[button, { width: 140, flexDirection: 'row' }]} onPress={() => navigation.navigate('Vacation')}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Urlop</Text>
            </TouchableOpacity>
        </View>
    </>
}

SettingsScreen.navigationOptions = {
    title: 'Ustawienia',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({})

export default SettingsScreen;