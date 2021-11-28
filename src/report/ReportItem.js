import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { globalBackground, detailTitle, detailParagraph } from '../../GlobalStyles';

const ReportItem = ({ report }) => {

    return (
        <View style={[globalBackground, { height: '100%', marginLeft: '2%' }]}>
            <Text style={[detailTitle, styles.customTitle]}>Data: <Text style={[detailParagraph, styles.customParagraph]}>{report.date.substring(0, 11)}</Text> </Text>
            <Text style={[detailTitle, styles.customTitle]}>Wartość usług: <Text style={[detailParagraph, styles.customParagraph]}>{report.totalWorkSum} zł</Text> </Text>
            <Text style={[detailTitle, styles.customTitle]}>Wartość kosztów: <Text style={[detailParagraph, styles.customParagraph]}>{report.totalCostsValue} zł</Text> </Text>
            <Text style={[detailTitle, styles.customTitle]}>Przychód: <Text style={[detailParagraph, styles.customParagraph]}>{report.income} zł</Text> </Text>
            <FlatList
                vertical={true}
                showsVerticalScrollIndicator={false}
                data={report.users}
                keyExtractor={user => user.id.toString()}
                renderItem={({ item, index }) => (
                    <Text style={[detailTitle, styles.customTitle]}>{item.name}: <Text style={[detailParagraph, styles.customParagraph]}>{item.workedHours} h</Text></Text>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    customTitle: {
        fontFamily: 'MerriWeatherBold',
        textAlign: 'left'
    },
    customParagraph: {
        fontFamily: 'MerriWeather'
    }
})

export default ReportItem;