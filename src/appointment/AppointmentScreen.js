import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ScrollView, Platform, SafeAreaView } from 'react-native';
import { Context } from './context/AppointmentContext';
import AppointmentItem from './AppointmentItem';
import BaseRadioGroup from '../base_components/BaseRadioGroup';
import { changeShowMode } from './AppointmentService';
import { buttonIcons } from '../icons/Icons';
import { globalBackground, buttonText, button, headerBackgroundColor, headerTitleColor } from '../../GlobalStyles';
import { Context as AuthContext } from '../signin/context/AuthContext';
import { HeaderBackButton } from 'react-navigation-stack';
import AndroidWeekView from './android_view/AndroidWeekView';

// function extractHours(startDate) {
//     return startDate.substring(11, 16);
// }

//CONFIGURATION
let boxHeight = 100;
let hours = ["6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let headerTitle;

// function sortList(appointments, appointmentsToShow, selectedDay) {
//     if (appointmentsToShow.myAppointments && !appointmentsToShow.employeeAppointments) {
//         return appointments.filter((appointment) =>
//             appointment.employee.role === 'ADMIN' && appointment.finishDate.substring(8, 10) == selectedDay
//         );
//     }
//     if (!appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) {
//         return appointments.filter((appointment) =>
//             appointment.employee.role === 'USER' && appointment.finishDate.substring(8, 10) == selectedDay
//         );
//     }
//     if (appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) {
//         return appointments.filter((appo) => appo.finishDate.substring(8, 10) == selectedDay);
//     }
//     if (!appointmentsToShow.myAppointments && !appointmentsToShow.employeeAppointments) {
//         return [];
//     }
// }
function sortList(appointments, appointmentsToShow, selectedDay) {
    if (appointmentsToShow.myAppointments && !appointmentsToShow.employeeAppointments) {
        return appointments.filter((appointment) =>
            appointment.employee.role === 'ADMIN'
        );
    }
    if (!appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) {
        return appointments.filter((appointment) =>
            appointment.employee.role === 'USER'
        );
    }
    if (appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) {
        return appointments;
    }
    if (!appointmentsToShow.myAppointments && !appointmentsToShow.employeeAppointments) {
        return [];
    }
}

function buildHeaderTitle(date) {
    let dayShortcut;
    let day = date.getDay();
    switch (day) {
        case 0:
            dayShortcut = "Ndz";
            break;
        case 1:
            dayShortcut = "Pon";
            break;
        case 2:
            dayShortcut = "Wt";
            break;
        case 3:
            dayShortcut = "Śr";
            break;
        case 4:
            dayShortcut = "Czw";
            break;
        case 5:
            dayShortcut = "Pt";
            break;
        case 6:
            dayShortcut = "Sob";
            break;
    }

    //return dayShortcut + " - " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); 
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(); 
}

const AppointmentScreen = ({ navigation }) => {
    const { state, getAppointments } = useContext(Context);
    const authState = useContext(AuthContext);
    const [appointmentsToShow, setAppointmentsToShow] = useState(
        authState.state.role === 'ADMIN' ? { myAppointments: true, employeeAppointments: false } : { myAppointments: false, employeeAppointments: true }
    );

    const [selectedDay, setSelectedDay] = useState(navigation.getParam('selectedDate').day)
    function changeAppointmentsToShow(event) {
        setAppointmentsToShow(event);
    }

    useEffect(() => {
        const date = navigation.getParam('selectedDate');
        headerTitle = date.day + '/' + date.month + '/' + date.year;

        getAppointments(date.month, date.year, authState.state.id);
        // let selectedDate = navigation.getParam('selectedDate');
        // let formattedDate = selectedDate.day + "/" + selectedDate.month + "/" + selectedDate.year + " 00:00";

        const listener = navigation.addListener('didFocus', () => {
            getAppointments(date.month, date.year, authState.state.id);
        });

        return () => {
            listener.remove();
        };
    }, []);

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {

        });

        return () => {
            listener.remove();
        };
    }, [appointmentsToShow]);

    return (
        <>
            {
                // Platform.OS === 'ios' ?
                //     <>
                //         {authState.state.role === 'ADMIN' ?
                //             <View style={[globalBackground, { marginBottom: 0, justifyContent: 'center', zIndex: 2 }]}>
                //                 <BaseRadioGroup navigation={navigation} changeAppointmentsToShow={changeAppointmentsToShow} />
                //             </View> : null
                //         }
                //         <ScrollView contentContainerStyle={{ height: 1800 }} showsVerticalScrollIndicator={false}>
                //             <View style={[globalBackground, { position: 'absolute', zIndex: -2, height: 2000, top: authState.state.role === 'ADMIN' ? 30 : 0 }]}>
                //                 <FlatList
                //                     data={hours}
                //                     keyExtractor={(item, index) => index.toString()}
                //                     renderItem={({ item, index }) => {
                //                         return (
                //                             <View key={index} style={{ flexDirection: 'row' }}>
                //                                 <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:00</Text>
                //                                 <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:15</Text>
                //                                 <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:30</Text>
                //                                 <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:45</Text>
                //                             </View>

                //                         )
                //                     }}
                //                 />
                //             </View>

                //             <View style={{ position: 'absolute', width: windowWidth, height: 2000, zIndex: -1 }}>
                //                 {(appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) ?
                //                     (
                //                         sortList(state, appointmentsToShow, selectedDay).map((item) => {
                //                             return (
                //                                 <View key={item.id.toString()} style={{ position: 'absolute', backgroundColor: 'yellow', height: windowHeight }}>
                //                                     <AppointmentItem appointment={item} navigation={navigation} mode={'double'} selectedDate={navigation.getParam('selectedDate')} />
                //                                 </View>
                //                             )
                //                         })

                //                     )
                //                     :
                //                     (
                //                         sortList(state, appointmentsToShow, selectedDay).map((item) => {
                //                             return (
                //                                 <View key={item.id.toString()} style={{ position: 'absolute', backgroundColor: 'yellow', height: windowHeight }}>
                //                                     <AppointmentItem appointment={item} navigation={navigation} mode={'single'} selectedDate={navigation.getParam('selectedDate')} />
                //                                 </View>
                //                             )
                //                         })
                //                     )}
                //             </View>
                //         </ScrollView>
                //     </>
                //     :
                <>
                    {authState.state.role === 'ADMIN' ?
                        <View style={[globalBackground, { marginBottom: 0, justifyContent: 'center', zIndex: 2 }]}>
                            <BaseRadioGroup navigation={navigation} changeAppointmentsToShow={changeAppointmentsToShow} />
                        </View> : null
                    }
                    <AndroidWeekView
                        navigation={navigation}
                        appointments={sortList(state, appointmentsToShow, selectedDay)}
                        selectedDate={navigation.getParam('selectedDate')}
                        onChangedDay={(date) => {
                            headerTitle = buildHeaderTitle(date);
                            // need to call setParams to update the navigation's header title
                            navigation.setParams({ param: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() })
                            navigation.setParams({ selectedDate: { 
                                dateString: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                                day: date.getDate(),
                                month: (date.getMonth() + 1),
                                year: date.getFullYear()
                            }})
                        }}
                    />
                </>
            }

            <TouchableOpacity style={[styles.wrapper, button]} onPress={() => {
                navigation.navigate('AppointmentAdd', { selectedDate: navigation.getParam('selectedDate') })
            }}>
                <Text style={[buttonText, { fontFamily: 'MerriWeatherBold' }]}>Dodaj wizytę</Text>
            </TouchableOpacity>
        </>
    );
}

AppointmentScreen.navigationOptions = ({ navigation }) => {
    return {
        title: headerTitle,
        headerTintColor: headerTitleColor,
        headerTitleStyle: {
            fontFamily: 'MerriWeatherBold'
        },
        headerStyle: {
            backgroundColor: headerBackgroundColor,
        },
        headerLeft: (props) => (
            <HeaderBackButton
                {...props}
                //style={styles.custom}
                onPress={() => {
                    navigation.navigate('AppointmentCalendar');
                }}
            />
        ),
        headerBackTitle: 'Kalendarz'
        // headerLeft: () => (
        //     <Button
        //       onPress={() => navigation.pop('Clients')}
        //       title="Info"
        //       color="#fff"
        //     />
        //   )
    }
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: '87%',
        left: '50%',
        //top: 650, 
        //left: 200,
        zIndex: 1,
        borderRadius: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.7,
        shadowRadius: 3
    },
})

export { boxHeight };
export default AppointmentScreen;


// {authState.state.role === 'ADMIN' ?
                //     <View style={[globalBackground, { marginBottom: 0, justifyContent: 'center', zIndex: 2 }]}>
                //         <BaseRadioGroup navigation={navigation} changeAppointmentsToShow={changeAppointmentsToShow} />
                //     </View> : null
                // }
                // <ScrollView contentContainerStyle={{ height: 1800 }} showsVerticalScrollIndicator={false}>
                //     <View style={[globalBackground, { position: 'absolute', zIndex: -2, height: 2000, top: authState.state.role === 'ADMIN' ? 30 : 0 }]}>
                //         <FlatList
                //             data={hours}
                //             keyExtractor={(item, index) => index.toString()}
                //             renderItem={({ item, index }) => {
                //                 return (
                //                     <View key={index} style={{ flexDirection: 'row' }}>
                //                         <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:00</Text>
                //                         <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:15</Text>
                //                         <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:30</Text>
                //                         <Text style={{ borderColor: '#d9d3d3', borderWidth: 1, height: boxHeight, width: (windowWidth / 60) * (15) }}>{item}:45</Text>
                //                     </View>

                //                 )
                //             }}
                //         />
                //     </View>

                //     <View style={{ position: 'absolute', width: windowWidth, height: 2000, zIndex: -1 }}>
                //         {(appointmentsToShow.myAppointments && appointmentsToShow.employeeAppointments) ?
                //             (
                //                 sortList(state, appointmentsToShow, selectedDay).map((item) => {
                //                     return (
                //                         <View key={item.id.toString()} style={{ position: 'absolute', backgroundColor: 'yellow', height: windowHeight }}>
                //                             <AppointmentItem appointment={item} navigation={navigation} mode={'double'} selectedDate={navigation.getParam('selectedDate')} />
                //                         </View>
                //                     )
                //                 })

                //             )
                //             :
                //             (
                //                 sortList(state, appointmentsToShow, selectedDay).map((item) => {
                //                     return (
                //                         <View key={item.id.toString()} style={{ position: 'absolute', backgroundColor: 'yellow', height: windowHeight }}>
                //                             <AppointmentItem appointment={item} navigation={navigation} mode={'single'} selectedDate={navigation.getParam('selectedDate')} />
                //                         </View>
                //                     )
                //                 })
                //             )}
                //     </View>
                // </ScrollView>