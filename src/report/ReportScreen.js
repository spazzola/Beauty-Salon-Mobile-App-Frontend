import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from './context/ReportContext';
import { globalBackground, button, buttonWrapper, buttonText, detailTitle, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import ReportItem from './ReportItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import BaseSpinner from '../base_components/BaseSpinner';

const ReportScreen = ({ navigation }) => {
    const { state, generateMonthlyReport } = useContext(Context);
    const [date, setDate] = useState(new Date(Date.now()));
    const [showReportContent, setShowReportContent] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {
        });

        return () => {
            listener.remove();
        };
    }, []);

    const onChange = (event, selectedDate) => {
        var month = selectedDate.getMonth() + 1;
        var year = selectedDate.getFullYear();
        setDate(new Date(year, month - 1));
    };

    return (
        <View style={[globalBackground, { height: '100%' }]}>
            <View style={{ alignItems: 'center' }}>
                <Text style={[detailTitle, styles.label, { fontFamily: 'MerriWeatherBold' }]}>Wybierz datę:</Text>
                <DateTimePicker
                    value={date}
                    onChange={onChange}
                    style={{ width: '32%', marginTop: '5%' }}
                />
            </View>

            <View style={[buttonWrapper, { marginBottom: 50, marginTop: 30 }]}>
                <TouchableOpacity style={[button, { marginTop: '5%', width: 190 }]} onPress={async () => {
                    setShowSpinner(!showSpinner);
                    await generateMonthlyReport(date.getMonth() + 1, date.getFullYear());
                    setShowSpinner(false);
                    setShowReportContent(true);
                }} title={'Generuj raport'}>
                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Generuj raport</Text>
                </TouchableOpacity>
            </View>

            {
                showReportContent ? <ReportItem report={state} /> : null
            }
            {showSpinner ?
                <BaseSpinner />
                : null}
        </View>
    );
}

ReportScreen.navigationOptions = {
    title: 'Raporty',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
})

export default ReportScreen;