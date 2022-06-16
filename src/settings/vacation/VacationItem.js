import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context } from '../context/SettingsContext';
import { buttonWrapper, button, buttonText, globalBackground, headerTitleColor, headerBackgroundColor } from '../../../GlobalStyles';


const VacationItem = ({ vacation, index, navigation, onDelete }) => {
    const { deleteVacation, getAllVacations } = useContext(Context);
    
    return (
        <>
            <View style={{ marginTop: index == 0 ? '5%' : '0%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={[{ fontSize: 18, alignSelf: 'center', fontFamily: 'MerriWeatherBold' }]}>{vacation.employee.name}</Text>
                    <Text style={[{ fontSize: 18, alignSelf: 'center', fontFamily: 'MerriWeather' }]}> {vacation.startDate} - {vacation.finishDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={[buttonWrapper, { marginTop: '2%' }]}>
                        <TouchableOpacity style={[button, styles.primaryButton]} onPress={() => {
                            navigation.navigate('VacationEdit', { id: vacation.id, navigation: navigation })
                        }}>
                            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold', color: headerTitleColor }]}>Edytuj</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[buttonWrapper, { marginTop: '2%' }]}>
                        <TouchableOpacity style={[button, { width: 130, height: 40, flexDirection: 'row' }]} onPress={() => {
                            Alert.alert(
                                "Usuwanie urlopu",
                                "Czy napewno chcesz usunąc urlop?",
                                [
                                    {
                                        text: "Nie",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Tak", onPress: () => {
                                            deleteVacation(vacation.id);
                                            onDelete();
                                        }
                                    }
                                ]
                            );
                        }}>
                            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Usuń</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={ styles.borderLine }></View>
        </>
    );
}

const styles = StyleSheet.create({
    primaryButton: {
        width: 130,
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'rgb(239, 239, 239)',
        borderWidth: 3,
        borderColor: headerTitleColor
    },
    borderLine: {
        borderBottomWidth: 1, 
        marginBottom: '6%', 
        marginTop: '3%',
        marginLeft: '3%',
        marginRight: '3%',
        borderBottomColor: headerTitleColor
    }
});


export default VacationItem;