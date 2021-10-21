import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { calculateDurationTime, createAppointmentBoxes, createBoxes } from './AppointmentService';
import { boxHeight } from './AppointmentScreen';
import icons from '../icons/Icons';

const windowWidth = Dimensions.get('window').width;

const AppointmentItem = ({ appointment, navigation }) => {
    const [boxes, setBoxes] = useState([]);
    //const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        const appoBoxes = createBoxes(appointment);
        setBoxes(appoBoxes);
        const listener = navigation.addListener('didFocus', () => {
            const appoBoxes = createBoxes(appointment);
            setBoxes(appoBoxes);
        });

        return () => {
            listener.remove();
        };
    }, []);
    return (
        <>
            {boxes.map((item, index) => {
                return (
                    <TouchableOpacity style={{
                        position: 'absolute',
                        width: (windowWidth / 60) * (item.elementsNumber * 5),
                        height: boxHeight,
                        top: item.location[0],
                        left: (item.location[1] * (windowWidth / 60)),
                    }} onPress={() => navigation.navigate('Appointment', { id: item.appointmentId })}>
                        <View style={{}}>
                            <View style={{
                                borderTopLeftRadius: index === 0 ? 35 : 0,
                                borderBottomLeftRadius: index === 0 ? 35 : 0,
                                borderTopRightRadius: index === boxes.length - 1 ? 35 : 0,
                                borderBottomRightRadius: index === boxes.length - 1 ? 35 : 0,
                                borderWidth: 1,
                                top: '25%',
                                height: '80%',
                                backgroundColor: '#f042c7',
                                shadowColor: '#171717',
                                shadowOffset: { width: 2, height: 4 },
                                shadowOpacity: 0.7,
                                shadowRadius: 3,
                                //justifyContent: 'center'
                            }}>
                                <View style={{ height: '100%', justifyContent: '', flexDirection: 'row' }}>
                                    <Text style={styles.label}>
                                        {item.clientName}
                                    </Text>
                                    <Text style={{}}>
                                        {item.workIcons.length > 0 ? (
                                            <FlatList
                                                horizontal
                                                data={item.workIcons}
                                                keyExtractor={(item, index) => index}
                                                renderItem={({ item }) => {
                                                    return <View style={{ backgroundColor: '', marginLeft: 20 }}><Image style={styles.icon} source={(icons.find(icon => icon.name === item)).uri} /></View>
                                                }}
                                            />
                                        ) : ''}
                                    </Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </>);
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: 50,
        borderWidth: 1,
        marginBottom: 3,
    },
    paragraph: {
        fontSize: 30,
        flex: 1,
        backgroundColor: 'grey'
    },
    label: {
        fontSize: 23,
        marginLeft: 10,
        height: '50%'
    },
    icon: {
        width: 40,
        height: 40,
    }
});


export default AppointmentItem;