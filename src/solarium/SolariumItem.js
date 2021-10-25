import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import SolariumForm from './SolariumForm';
import { Context } from './context/SolariumContext';
import { itemContainer, detailTitle, itemParagraph, globalBackground } from '../../GlobalStyles';

const SolariumItem = ({ solarium, onSubmit, initialValues, navigation }) => {
    const { useSolarium, getMonthSolarium } = useContext(Context);

    return (
        <View style={[globalBackground, { height: '100%' }]}>
            <View style={itemContainer}>
                <Text style={[itemParagraph, { textAlign: 'center', marginTop: 5 }]}> Obecnie użyto: {solarium.usedTime} min</Text>
            </View>

            <SolariumForm
                onSubmit={(usedTime, usedDate) => {
                    useSolarium(usedTime, usedDate, () => {
                        var month = new Date().getMonth() + 1;
                        var year = new Date().getFullYear();
                        getMonthSolarium(month, year);
                    });
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