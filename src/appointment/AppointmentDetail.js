import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Alert, Platform } from 'react-native';
import { Context as AppointmentContext } from './context/AppointmentContext';
import { Context as WorkContext } from '../work/context/WorkContext';
import { workIcons, buttonIcons } from '../icons/Icons';
import { globalBackground, detailTitle, detailParagraph, button, buttonText, buttonWrapper, headerTitleColor, headerBackgroundColor } from '../../GlobalStyles';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker'
import { format } from 'date-fns'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseSpinner from '../base_components/BaseSpinner';

function getWorkIds(worksList) {
    const resultList = [];
    worksList.forEach(appointmentDetails => resultList.push(appointmentDetails.work.id));

    return resultList;
}

function formatDate(date) {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);

    return day + "/" + month + "/" + year;
}


const AppointmentDetail = ({ navigation }) => {
    const { state, deleteAppointment, editAppointment, getAppointments } = useContext(AppointmentContext);
    const workContext = useContext(WorkContext);
    const [appointment, setAppointment] = useState(state.find((appointment) => appointment.id === navigation.getParam('id')));
    const [showSpinner, setShowSpinner] = useState(false);

    const [isEditDateModalVisible, setIsEditDateModalVisible] = useState(false);
    const [isEditWorksModalVisible, setIsEditWorksModalVisible] = useState(false);

    const [showAndroidDateModal, setShowAndroidDateModal] = useState(false);
    const [type, setType] = useState('date');

    const showDateModal = (type) => {
        setShowAndroidDateModal(!showAndroidDateModal);
        setType(type);
    };

    const showDatePicker = () => {
        showDateModal('date');
    };
    const showTimePicker = () => {
        showDateModal('time');
    };

    const [workDropDownOpen, setWorkDropDownOpen] = useState(false);
    const [workIds, setWorkId] = useState(null);
    const [workItems, setWorks] = useState([]);

    useEffect(() => {
        getAppointments();
        const listener = navigation.addListener('didFocus', () => {
        });
        return () => {
            listener.remove();
        };
    }, [isEditDateModalVisible])

    useEffect(() => {
        workContext.getWorks();
        const assignedWorksIds = getWorkIds(appointment.appointmentDetails);
        setWorkId(assignedWorksIds);

        const listener = navigation.addListener('didFocus', () => {
        });
        return () => {
            listener.remove();
        };
    }, [isEditWorksModalVisible])

    const startYear = appointment.startDate.substring(0, 4);
    const startMonth = appointment.startDate.substring(5, 7);
    const startDay = appointment.startDate.substring(8, 10);
    const startHour = appointment.startDate.substring(11, 13);
    const startMinute = appointment.startDate.substring(14, 16);

    const [startDate, setStartDate] = useState(new Date(startYear, startMonth - 1, startDay, startHour, startMinute));

    const onChangeDate = (event, selectedDate) => {
        let currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setShowAndroidDateModal(false);
    };


    return (
        <>
            <ScrollView style={[globalBackground, { height: '100%' }]} nestedScrollEnabled={true}>
                <View style={globalBackground}>
                    <View style={[{ height: '20%', flexDirection: 'row', justifyContent: 'center' }]}>
                        <View>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Klient:</Text>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Nr kom:</Text>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Wartość:</Text>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Data:</Text>
                            <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold' }]}>Godzina:</Text>
                        </View>

                        <View>
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {appointment.client.name} {appointment.client.surname}</Text>
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {appointment.client.phoneNumber}</Text>
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {appointment.worksSum} zł</Text>
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {formatDate(appointment.startDate)}</Text>
                            <Text style={[detailParagraph, { fontFamily: 'MerriWeather' }]}> {appointment.startDate.substring(11, 16)}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 70 }}>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold', textAlign: 'center' }]}>Usługi:</Text>
                        <FlatList
                            vertical={true}
                            style={{ width: '200%', height: 150 }}
                            showsVerticalScrollIndicator={false}
                            data={appointment.appointmentDetails}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item, index }) => (
                                <>
                                    <View style={{ flexDirection: 'row', width: '100%', marginLeft: '2%', marginTop: '2%' }}>
                                        <Image style={styles.icon} source={(workIcons.find(icon => icon.name === item.work.iconName)).uri} />
                                        <Text style={[detailParagraph, { fontFamily: 'MerriWeather', marginTop: 5, marginLeft: 5 }]} key={index} >{item.work.name}</Text>
                                    </View>
                                </>
                            )}
                        />
                    </View>

                    <View>
                        <Text style={[detailTitle, { fontFamily: 'MerriWeatherBold', textAlign: 'center' }]}>Uwagi:</Text>
                        <ScrollView style={{}}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[detailParagraph, { fontFamily: 'MerriWeather', marginLeft: '5%', marginRight: '5%' }]}> {appointment.note}</Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View>
                        <View>
                            <View style={[buttonWrapper]}>
                                <TouchableOpacity style={button} onPress={() => {
                                    setIsEditDateModalVisible(true);
                                }}>
                                    <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Przełóz wizytę</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[buttonWrapper, { flexDirection: 'row' }]}>
                            <TouchableOpacity style={button} onPress={() => {
                                setIsEditWorksModalVisible(true);
                            }}
                            >
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Zmień usługi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={button} onPress={() => navigation.navigate('AppointmentEdit', { id: navigation.getParam('id'), selectedDate: navigation.getParam('selectedDate') })}>
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Edytuj wizytę</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View>
                        <View style={[buttonWrapper]}>
                            <TouchableOpacity style={button} onPress={async () => {
                                Alert.alert(
                                    "Usuwanie wizyty",
                                    "Czy napewno chcesz usunąć wizytę?",
                                    [
                                        {
                                            text: "Nie",
                                            style: "cancel"
                                        },
                                        {
                                            text: "Tak", onPress: async () => {
                                                setShowSpinner(!showSpinner);
                                                await deleteAppointment(appointment.id);
                                                setShowSpinner(!showSpinner);
                                                navigation.navigate('Appointments');
                                            }
                                        }
                                    ]
                                );
                            }}
                            >
                                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Odwołaj wizytę</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {showSpinner ?
                        <BaseSpinner />
                        : null}
                </View>
            </ScrollView>

            <Modal isVisible={isEditDateModalVisible} onBackdropPress={() => setIsEditDateModalVisible(false)}>
                <View style={[styles.modalContainer, { height: Platform.OS === 'ios' ? '85%' : '55%' }]}>
                    <View style={[styles.headerWrapper, { height: Platform.OS === 'ios' ? '8%' : '15%' }]}>
                        <Text style={styles.modalHeader}>Przekładanie wizyty</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: '5%' }}>
                        {Platform.OS === 'ios' ?
                            <>
                                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'MerriWeatherBold', marginBottom: '2%' }}>Wybierz datę</Text>
                                <DateTimePicker
                                    value={startDate}
                                    onChange={onChangeDate}
                                    display='spinner'
                                    is24Hour={true}
                                    locale={'pl'}
                                    style={{ backgroundColor: '#FBACCC' }}
                                />
                                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: 'NotoSerif' }}>Wybierz godzinę</Text>
                                <DateTimePicker
                                    value={startDate}
                                    onChange={onChangeDate}
                                    mode='time'
                                    display='spinner'
                                    is24Hour={true}
                                />
                            </>
                            :
                            <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={[buttonWrapper, { marginTop: 0 }]}>
                                    <TouchableOpacity style={[button, { width: 180, flexDirection: 'row' }]} onPress={showDatePicker}>
                                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Wybierz datę</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[detailParagraph, { fontSize: 17, marginTop: 5, fontFamily: 'MerriWeather', color: globalBackground.backgroundColor, margin: 'auto' }]}> Wybrana data: {startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear()}</Text>
                                {
                                    showAndroidDateModal ?
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={startDate}
                                            mode={type}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChangeDate}
                                        />
                                        : null
                                }
                                <View style={buttonWrapper}>
                                    <TouchableOpacity style={[button, { width: 180, flexDirection: 'row' }]} onPress={showTimePicker}>
                                        <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Wybierz czas</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[detailParagraph, { fontSize: 17, marginTop: 5, fontFamily: 'MerriWeather', color: globalBackground.backgroundColor, margin: 'auto' }]}> Wybrany czas: {startDate.getHours() + ':' + startDate.getMinutes()}</Text>
                            </View>
                        }
                        <View style={[buttonWrapper, { width: '100%', marginTop: Platform.OS === 'android' ? '15%' : 30 }]}>
                            <TouchableOpacity style={button} onPress={async () => {
                                setIsEditDateModalVisible(false);
                                setShowSpinner(!showSpinner);
                                const jwt = await AsyncStorage.getItem('jwt');
                                const formattedDate = format(startDate, 'dd.MM.yyyy HH:mm').replace(/\./g, '/');
                                const extractedDate = formattedDate.substring(0, 10) + " " + formattedDate.substring(11, 16);
                                let appointmentToUpdate = {
                                    appointmentId: appointment.id,
                                    startDate: extractedDate,
                                    clientId: appointment.client.id,
                                    employeeId: appointment.employee.id,
                                    workIds,
                                    percentageValueToAdd: appointment.percentageValueToAdd
                                };
                                let response = await fetch(
                                    'http://188.68.237.171:8080/myfront/appointment/update',
                                    {
                                        method: 'PUT',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + jwt
                                        },
                                        body: JSON.stringify(appointmentToUpdate)
                                    }
                                );
                                let json = await response.json();
                                console.log(json);
                                setAppointment(json);
                                setShowSpinner(false);
                            }}
                            >
                                <Text style={[buttonText, { fontFamily: 'NotoSerif' }]}>Przełóż</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={isEditWorksModalVisible} style={{ margin: '1%' }} onBackdropPress={() => setIsEditWorksModalVisible(false)}>
                <View style={[styles.modalContainer, { height: Platform.OS === 'ios' ? '30%' : '35%' }]}>
                    <View style={styles.headerWrapper}>
                        <Text style={styles.modalHeader}>Zamiana usług</Text>
                    </View>
                    <View style={{ width: '100%', marginTop: '5%' }}>
                        <DropDownPicker
                            searchable={true}
                            searchPlaceholder="Wyszukaj..."
                            searchContainerStyle={{
                                borderWidth: 1,
                                borderRadius: 6,
                                backgroundColor: '#F1D1D0'
                            }}
                            style={[styles.dropDownPicker]}
                            textStyle={{
                                fontFamily: 'NotoSerif',
                                fontSize: 20,
                                textAlign: 'center',
                                //width: '50%'
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: '#F1D1D0',
                                width: '100%',
                                borderWidth: 2,
                                alignItems: 'stretch',
                            }}
                            dropDownDirection="TOP"
                            placeholder="Wybierz usługę"
                            multiple={true}
                            min={1}
                            mode="BADGE"
                            badgeColors={["#6ECB63", "#FFEDED", "#95DAC1", "#FD6F96", "#FF67E7"]}
                            showBadgeDot={false}
                            open={workDropDownOpen}
                            value={workIds}
                            items={workContext.state.map(work => ({ label: `${work.name} - ${work.price}zł`, value: work.id }))}
                            setOpen={setWorkDropDownOpen}
                            setValue={setWorkId}
                            setItems={setWorks}
                        />
                        <View style={[buttonWrapper, { width: '100%', marginTop: '10%' }]}>
                            <TouchableOpacity style={button} onPress={async () => {
                                setIsEditWorksModalVisible(false);
                                setShowSpinner(!showSpinner);
                                const jwt = await AsyncStorage.getItem('jwt');
                                const formattedDate = format(startDate, 'dd.MM.yyyy HH:mm').replace(/\./g, '/');
                                const extractedDate = formattedDate.substring(0, 10) + " " + formattedDate.substring(11, 16);
                                let appointmentToUpdate = {
                                    appointmentId: appointment.id,
                                    startDate: extractedDate,
                                    clientId: appointment.client.id,
                                    employeeId: appointment.employee.id,
                                    workIds,
                                    percentageValueToAdd: appointment.percentageValueToAdd
                                };
                                let response = await fetch(
                                    'http://188.68.237.171:8080/myfront/appointment/update',
                                    {
                                        method: 'PUT',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + jwt
                                        },
                                        body: JSON.stringify(appointmentToUpdate)
                                    }
                                );
                                let json = await response.json();
                                setAppointment(json);
                                setShowSpinner(false);
                                // editAppointment(appointment.id, startDate, appointment.client.id, appointment.employee.id, workIds, appointment.percentageValueToAdd).then((response) => {console.log(response.data)});
                            }}
                            >
                                <Text style={[buttonText, { fontFamily: 'NotoSerif' }]}>Zmień</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

AppointmentDetail.navigationOptions = {
    title: 'Wizyta',
    headerTintColor: headerTitleColor,
    headerTitleStyle: {
        fontFamily: 'MerriWeatherBold'
    },
    headerStyle: {
        backgroundColor: headerBackgroundColor,
    },
};

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '80%',
        //flex: 1, 
        backgroundColor: '#FBACCC',
        borderRadius: 30
    },
    headerWrapper: {
        height: '20%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#F875AA',
        justifyContent: 'center'
    },
    modalHeader: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'MerriWeatherBold'
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: globalBackground.backgroundColor
    },
    icon: {
        width: 40,
        height: 40,
        marginTop: 0,
    },
    paragraph: {
        //marginTop: 13,
        fontSize: 25,
        textAlign: 'left',
    },
    wrapper: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    },
    dropDownPicker: {
        marginTop: 30,
        width: '100%',
        borderWidth: 2,
        backgroundColor: '#F1D1D0'
    },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    }
});

export default AppointmentDetail;