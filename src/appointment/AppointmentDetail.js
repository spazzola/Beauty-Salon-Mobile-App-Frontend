import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Context } from './context/AppointmentContext';
import { workIcons, buttonIcons } from '../icons/Icons';
import Modal from "react-native-modal";

const AppointmentDetail = ({ navigation }) => {
    const { state, deleteAppointment } = useContext(Context);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const appointment = state.find((appointment) => appointment.id === navigation.getParam('id'));

    return (
        <View>
            <Text style={styles.paragraph}><Text style={styles.title}>Appointment id: </Text> {appointment.id}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Klient: </Text> {appointment.client.name} {appointment.client.surname}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Nr.kom: </Text> {appointment.client.phoneNumber}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Wartość: </Text> {appointment.worksSum}</Text>
            <Text style={styles.paragraph}><Text style={styles.title}>Usługi: </Text> {appointment.appointmentDetails.map((item, index) => {
                return (
                    <>
                        <Text key={index}>{item.work.name}</Text>
                        <Image style={styles.icon} source={(workIcons.find(icon => icon.name === item.work.iconName)).uri} />
                    </>
                )
            })}</Text>

            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => {
                    setIsModalVisible(true);
                }}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'changeDate')).uri} />
                </TouchableOpacity>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'editAppointment')).uri} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'editAppointment')).uri} />
                </TouchableOpacity>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <Image style={styles.button} source={(buttonIcons.find(icon => icon.name === 'cancelAppointment')).uri} />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                isVisible={isModalVisible}>
                <View style={{ width: '100%', height: 500, backgroundColor: 'red' }}>
                    <Text style={{}}>I am the modal content!</Text>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    paragraph: {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    delete: {
        height: 20,
        width: 50
    },
    icon: {
        width: 40,
        height: 40,
    },
    button: {
        width: 160,
        height: 80
    }
});

export default AppointmentDetail;