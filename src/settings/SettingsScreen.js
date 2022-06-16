import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from './context/SettingsContext';
import BaseSpinner from '../base_components/BaseSpinner';
import { headerBackgroundColor, headerTitleColor, buttonWrapper, button, buttonText, globalBackground } from '../../GlobalStyles';

const SettingsScreen = ({ navigation }) => {
    const { state, getAllVacations } = useContext(Context);
    const [showSpinner, setShowSpinner] = useState(false);

    return <>
        <View style={[styles.container, globalBackground]}>
            <View style={buttonWrapper}>
                <TouchableOpacity style={[button, { width: 140, flexDirection: 'row' }]} onPress={async() => {
                    setShowSpinner(!showSpinner);
                    await getAllVacations();
                    navigation.navigate('Vacation')
                    setShowSpinner(false);
                }
                }>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Urlop</Text>
                </TouchableOpacity>
            </View>
        </View>
        {showSpinner ?
            <BaseSpinner />
            : null}
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

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
})

export default SettingsScreen;