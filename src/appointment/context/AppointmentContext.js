import createDataContext from '../../../createDataContext';
import axios from '../../../axios-config';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appointmentReducer = (state, action) => {
    switch (action.type) {
        case 'get_appointments':
            return action.payload;
        case 'delete_appointment':
            return state.filter(appointment => appointment.id !== action.payload);
        case 'edit_appointment':
            return state.map(appointment => {
                return appointment.id === action.payload.id ? action.payload : appointment;
            });
        default:
            return state;
    }
}

const addAppointment = dispatch => {
    return async (startDate, percentageValueToAdd, clientId, employeeId, works, note, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        const formattedDate = format(startDate, 'dd.MM.yyyy HH:mm').replace(/\./g, '/');
        startDate = formattedDate.substring(0, 10) + " " + formattedDate.substring(11, 16);
        let appointment = {
            startDate,
            percentageValueToAdd,
            clientId,
            employeeId,
            works,
            note
        };

        await axios.post('/appointment/create', appointment, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie dodano wizyty. Sprawdź czy wybrana data nie koliduje z datą innej wizyty. \nKod błędu: " + error.response.status);
            });

        if (callback) {
            callback();
        };
    };
}

const getAppointments = dispatch => {
    return async (month, year, id) => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/appointment/getMonthAppointments', {
            params: {
                month,
                year,
                userId: id
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'get_appointments', payload: response.data });
    };
};

const getIncomingAppointments = dispatch => {
    return async (clientId) => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/appointment/getIncomingAppointments', {
            params: {
                clientId
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'get_appointments', payload: response.data });
    };
};

const deleteAppointment = dispatch => {
    return async id => {
        const jwt = await AsyncStorage.getItem('jwt');
        await axios.delete('/appointment/delete', {
            params: {
                id
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).catch(error => {
            Alert.alert("Błąd ", "Nie usunięto wizyty. \nKod błędu: " + error.response.status);
        });
        // ??? to delete?
        //getAppointments();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const editAppointment = dispatch => {
    return async (appointmentId, startDate, percentageValueToAdd, clientId, employeeId, works, note, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        const formattedDate = format(startDate, 'dd.MM.yyyy HH:mm').replace(/\./g, '/');
        startDate = formattedDate.substring(0, 10) + " " + formattedDate.substring(11, 16);
        let appointment = {
            appointmentId,
            startDate,
            clientId,
            employeeId,
            works,
            percentageValueToAdd,
            note
        };

        await axios.put('appointment/update', appointment, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie zaktualizowano wizyty. Sprawdź czy wybrana data nie koliduje z datą innej wizyty. \nKod błędu: " + error.response.status);
            });

        dispatch({
            type: 'edit_appointment',
            payload: { appointmentId, startDate, clientId, employeeId, works, percentageValueToAdd }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    appointmentReducer,
    { addAppointment, getAppointments, getIncomingAppointments, deleteAppointment, editAppointment },
    [])
// {
//     "id": 1,
//     "name": "Mariola",
//     "surname": "Bonaka",
//     "phoneNumber": "123456789",
//     "mail": "m@wp.pl",
//     "belatedCounter": 0
// },
// {
//     "id": 2,
//     "name": "Janina",
//     "surname": "Kowalska",
//     "phoneNumber": "123456789",
//     "mail": "m@wp.pl",
//     "belatedCounter": 0
// },
// {
//     "id": 3,
//     "name": "Ela",
//     "surname": "Manama",
//     "phoneNumber": "123456789",
//     "mail": "m@wp.pl",
//     "belatedCounter": 0
// }