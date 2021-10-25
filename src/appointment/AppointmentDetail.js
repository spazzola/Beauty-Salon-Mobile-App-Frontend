import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Context } from './context/AppointmentContext';
import { workIcons, buttonIcons } from '../icons/Icons';
import { globalBackground, detailTitle, detailParagraph } from '../../GlobalStyles';


const AppointmentDetail = ({ navigation }) => {
    const { state, deleteAppointment } = useContext(Context);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const appointment = state.find((appointment) => appointment.id === navigation.getParam('id'));

    return (
        <View style={{ height: '40%', backgroundColor: globalBackground.backgroundColor }}>
            <View style={[globalBackground, { height: '50%', flexDirection: 'row', justifyContent: 'center'}]}>
                <View>
                    <Text style={[detailTitle, { fontFamily: 'KalamBold' }]}>Klient:</Text>
                    <Text style={[detailTitle, { fontFamily: 'KalamBold' }]}>Nr kom:</Text>
                    <Text style={[detailTitle, { fontFamily: 'KalamBold' }]}>Wartość:</Text>
                </View>

                <View>
                    <Text style={[detailParagraph, { fontFamily: 'KalamRegular' }]}> {appointment.client.name} {appointment.client.surname}</Text>
                    <Text style={[detailParagraph, { fontFamily: 'KalamRegular' }]}> {appointment.client.phoneNumber}</Text>
                    <Text style={[detailParagraph, { fontFamily: 'KalamRegular' }]}> {appointment.worksSum} zł</Text>
                </View>
            </View>
            <View style={[globalBackground]}>
                <Text style={[detailTitle, { fontFamily: 'KalamBold', textAlign: 'center' }]}>Usługi:</Text>
                <Text style={{marginLeft: 10, maxHeight: 250}}> <FlatList
                    //vertical={true}
                    showsVerticalScrollIndicator={false}
                    data={appointment.appointmentDetails}
                    keyExtractor={(item, index) => 'key' + index}
                    renderItem={({ item, index }) => (
                        <>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.paragraph, { fontFamily: 'KalamRegular' }]} key={index} >{item.work.name}</Text>
                                <Image style={styles.icon} source={(workIcons.find(icon => icon.name === item.work.iconName)).uri} />
                            </View>
                        </>
                    )}
                /></Text>
            </View>

            <View style={[globalBackground, { height: '100%', flexDirection: 'column', alignItems: 'center' }]}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => {
                        setIsModalVisible(true);
                    }}>
                        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'changeDate')).uri} />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('')}>
                            <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'editAppointment')).uri} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('')}>
                            <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'editAppointment')).uri} />
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('')}>
                                <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'cancelAppointment')).uri} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: globalBackground.backgroundColor
    },
    delete: {
        height: 20,
        width: 50
    },
    icon: {
        width: 40,
        height: 40,
        marginTop: 10,
        marginLeft: 10
    },
    button: {
        width: 160,
        height: 80
    },
    paragraph: {
        marginTop: 13,
        fontSize: 25,
        textAlign: 'left',
    }
});

export default AppointmentDetail;