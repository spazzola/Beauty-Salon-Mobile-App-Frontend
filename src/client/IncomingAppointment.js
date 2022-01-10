import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { detailParagraph, itemParagraph } from '../../GlobalStyles';

function formatDate(date) {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    let hour = date.substring(11, 13);
    let minutes = date.substring(14, 16)

    return day + "/" + month + "/" + year + "   " + hour + ":" + minutes;
}

const IncomingAppointment = ({ navigation, appointment }) => {
    return (
        <>
            <TouchableOpacity onPress={() => { navigation.navigate('Appointment', { id: appointment.id })} }>
                <View style={{ borderBottomWidth: 2, borderBottomColor: '#F875AA', marginBottom: '1%', marginTop: '1%' }}>
                    <Text style={[detailParagraph, { fontFamily: 'MerriWeatherBold', fontSize: 16 }]}> {formatDate(appointment.startDate)}</Text>
                    <FlatList
                        style={{ marginBottom: '1%' }}
                        data={appointment.appointmentDetails}
                        keyExtractor={(item, index) => item.id.toString()}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                            <Text key={index} style={[detailParagraph, { fontFamily: 'MerriWeather', fontSize: 16 }]}> {item.work.name}</Text>
                        )}
                    />
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        marginBottom: 3,
    },
    paragraph: {
        fontSize: 30,
        flex: 1,
        backgroundColor: 'grey'
    }
});

export default IncomingAppointment;