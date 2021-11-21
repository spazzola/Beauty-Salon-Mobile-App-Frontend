import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { calculateDurationTime, createAppointmentBoxes, createBoxes, calculateElementTop, addBackgroundColor } from './AppointmentService';
import { boxHeight } from './AppointmentScreen';
import { workIcons } from '../icons/Icons';
import { Context as AuthContext } from '../signin/context/AuthContext';


const windowWidth = Dimensions.get('window').width;

const AppointmentItem = ({ appointment, navigation, mode }) => {
    const [boxes, setBoxes] = useState([]);
    const authState = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(authState.state.role === 'ADMIN' ? true : false);
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
    }, [appointment]);

    return (
        <>
            {boxes.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style={{
                        position: 'absolute',
                        width: (windowWidth / 60) * (item.elementsNumber * 5),
                        height: mode === 'single' ? boxHeight : boxHeight / 2,
                        display: mode === 'none' ? 'none' : '',
                        top: calculateElementTop(item, mode, appointment, isAdmin),
                        left: (item.location[1] * (windowWidth / 60)),
                    }} onPress={() => navigation.navigate('Appointment', { id: item.appointmentId })}>
                        <View style={{}}>
                            <View style={{
                                borderTopLeftRadius: index === 0 ? 30 : 0,
                                borderBottomLeftRadius: index === 0 ? 30 : 0,
                                borderTopRightRadius: index === boxes.length - 1 ? 30 : 0,
                                borderBottomRightRadius: index === boxes.length - 1 ? 30 : 0,
                                borderWidth: 1,
                                top: '25%',
                                height: '80%',
                                backgroundColor: addBackgroundColor(mode, appointment),
                                shadowColor: '#171717',
                                shadowOffset: { width: 2, height: 4 },
                                shadowOpacity: 0.7,
                                shadowRadius: 3,
                                //justifyContent: 'center'
                            }}>
                                <View style={{ height: '100%', flexDirection: 'row' }}>
                                    <View style={styles.label}>
                                        <Text style={[{ fontSize: mode === 'double' ? 20 : 30, fontFamily: 'MerriWeatherBold' }]}>
                                            {item.clientName}
                                        </Text>
                                    </View>

                                    <Text>
                                        {item.workIcons.length > 0 ? (
                                            <FlatList
                                                horizontal
                                                data={item.workIcons}
                                                keyExtractor={(item, index) => index}
                                                renderItem={({ item }) => {
                                                    return <View
                                                        style={{
                                                            marginLeft: 5,
                                                            alignItems: 'center', 
                                                            justifyContent: 'center',
                                                            height: '110%',
                                                            //backgroundColor: 'red'
                                                        }}>
                                                        <Image
                                                            style={[{
                                                                width: mode === 'double' ? 25 : 40,
                                                                height: mode === 'double' ? 25 : 40
                                                            }]} source={(workIcons.find(icon => icon.name === item)).uri} />
                                                    </View>
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
        marginLeft: '3%',
        height: '100%',
        alignItems: 'center', 
        justifyContent: 'center'
    }
});


export default AppointmentItem;