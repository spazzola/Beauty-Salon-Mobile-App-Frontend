import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import SolariumForm from './SolariumForm';
import { Context } from './context/SolariumContext';
import { itemContainer, detailTitle, itemParagraph, globalBackground } from '../../GlobalStyles';
import { useState } from 'react/cjs/react.development';

const SolariumItem = ({ solarium, onSubmit, initialValues, navigation }) => {
    const { useSolarium, getMonthSolarium } = useContext(Context);
    const [displayedText, setDisplayedText] = useState("Obecnie użyto:")

    return (
        <View style={[globalBackground, { height: '100%' }]}>
            <View style={itemContainer}>
                <Text style={[itemParagraph, { textAlign: 'center', marginTop: 5, fontFamily: 'MerriWeatherBold' }]}> {displayedText} {solarium.usedTime === undefined ? 0 : solarium.usedTime} min</Text>
            </View>

            <SolariumForm
                onSubmit={(usedTime, usedDate) => {
                    useSolarium(usedTime, usedDate, () => {
                        getMonthSolarium(usedDate.getMonth() + 1, usedDate.getFullYear());
                        var currentMonth = new Date().getMonth() + 1;
                        var currentYear = new Date().getFullYear();
                        if (currentMonth !== (usedDate.getMonth() + 1) || currentYear !== usedDate.getFullYear()) {
                            setDisplayedText("W " + (usedDate.getMonth() + 1) + "/" + usedDate.getFullYear() + " użyto:");
                        } else {
                            setDisplayedText("Obecnie użyto:")
                        }
                    });
                }}
                getSolarium={(usedDate) => {
                    getMonthSolarium(usedDate.getMonth() + 1, usedDate.getFullYear())
                    var currentMonth = new Date().getMonth() + 1;
                    var currentYear = new Date().getFullYear();
                    if (currentMonth !== (usedDate.getMonth() + 1) || currentYear !== usedDate.getFullYear()) {
                        setDisplayedText("W " + (usedDate.getMonth() + 1) + "/" + usedDate.getFullYear() + " użyto:");
                    } else {
                        setDisplayedText("Obecnie użyto:")
                    }
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        marginBottom: 3,
    },
    paragraph: {
        fontSize: 30,
        backgroundColor: 'grey',
        height: 40
    }
});


export default SolariumItem;