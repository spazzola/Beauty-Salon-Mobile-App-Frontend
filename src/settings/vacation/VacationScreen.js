import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Context } from '../context/SettingsContext';
import { headerBackgroundColor, headerTitleColor, buttonWrapper, button, buttonText, globalBackground } from '../../../GlobalStyles';
import VacationItem from './VacationItem';

function sortByIncomingOrPast(vacations, areIncomingSelected) {
    var resultVacations = [];

    var currentDate = new Date()
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();

    vacations.forEach(vacation => {
        var startYear = vacation.startDate.substring(6, 10);
        var startMonth = vacation.startDate.substring(3, 5);
        var startDay = vacation.startDate.substring(0, 2);
        var startHour = vacation.startDate.substring(11, 13);
        var startMinute = vacation.startDate.substring(14, 16);

        if (areIncomingSelected) {
            new Date(startYear, startMonth, startDay, startHour, startMinute) > new Date(currentYear, currentMonth, currentDay, currentHour, currentMinute) ? resultVacations.push(vacation) : null
        } else {
            new Date(startYear, startMonth, startDay, startHour, startMinute) < new Date(currentYear, currentMonth, currentDay, currentHour, currentMinute) ? resultVacations.push(vacation) : null
        }
        
    });

    return resultVacations;
}

const VacationScreen = ({ navigation }) => {
    const { state, getAllVacations } = useContext(Context);
    const [vacations, setVacations] = useState();
    const [areIncomingSelected, setAreIncomingSelected] = useState(true);
    const [arePastSelected, setArePastSelected] = useState(false);
    const [shouldRerenderState, setShouldRerenderState] = useState(false);

    useEffect(() => {
        getAllVacations()
        console.log("a");
        const listener = navigation.addListener('didFocus', () => {
            getAllVacations();
        });

        return () => {
            listener.remove();
        };
    }, [shouldRerenderState]);


    var touchIncomingProps = {
        activeOpacity: 1,
        underlayColor: 'white',
        style: areIncomingSelected ? styles.btnNormal : styles.btnPress,
        // onHideUnderlay: () => setAreIncomingSelected(false),
        // onShowUnderlay: () => setAreIncomingSelected(true),
        onPress: () => {
            setAreIncomingSelected(true);
            setArePastSelected(false);
        },
    };

    var touchPastProps = {
        activeOpacity: 1,
        underlayColor: 'white',
        style: arePastSelected ? styles.btnNormal : styles.btnPress,
        // onHideUnderlay: () => setAreIncomingSelected(false),
        // onShowUnderlay: () => setAreIncomingSelected(true),
        onPress: () => {
            setAreIncomingSelected(false);
            setArePastSelected(true);
        },
    };

    return <>
        <View style={{ flexDirection: 'row' }}>
            <View style={[styles.nameContainer, button, styles.nameButton, {
                borderRightColor: globalBackground.backgroundColor,
                borderRightWidth: 1
            }]}>
                <TouchableHighlight {...touchIncomingProps}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Nadchodzące</Text>
                </TouchableHighlight>
            </View>

            <View style={[styles.nameContainer, button, styles.nameButton, {
                borderRightColor: globalBackground.backgroundColor,
                borderRightWidth: 1
            }]}>
                <TouchableHighlight {...touchPastProps}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Przeszłe</Text>
                </TouchableHighlight>
            </View>
        </View>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={sortByIncomingOrPast(state, areIncomingSelected).sort((a, b) => new Date(a.startDate) - new Date(b.startDate))}
            keyExtractor={vacation => vacation.id.toString()}
            renderItem={({ item, index }) => {
                return (
                    <VacationItem vacation={item} index={index} navigation={navigation} onDelete={() => {
                        setShouldRerenderState(!shouldRerenderState);
                        console.log(shouldRerenderState);
                    }}></VacationItem>
                );
            }}
            ListFooterComponent={() => <View style={{ marginTop: '30%'}}></View>}
        />
        <TouchableOpacity style={[styles.wrapper, button]} onPress={() => navigation.navigate('VacationAdd')}>
            <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj urlop</Text>
        </TouchableOpacity>
    </>
}

VacationScreen.navigationOptions = {
    title: 'Urlopy',
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
    },
    btnNormal: {
        opacity: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnPress: {
        opacity: 0.6,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default VacationScreen;