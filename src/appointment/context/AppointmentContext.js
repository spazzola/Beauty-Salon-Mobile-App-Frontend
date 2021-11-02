import createDataContext from '../../../createDataContext';
import axios from '../../../axios-config';
import { format } from 'date-fns'


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
    return async (startDate, percentageValueToAdd, clientId, employeeId, workIds, note, callback) => {
        const formattedDate = format(startDate, 'dd.MM.yyyy HH:mm').replace(/\./g, '/');
        startDate = formattedDate.substring(0, 10) + " " + formattedDate.substring(11, 16);
        let appointment = {
            startDate,
            percentageValueToAdd,
            clientId,
            employeeId,
            workIds,
            note
        };

        await axios.post('/appointment/create', appointment);

        if (callback) {
            callback();
        };
    };
}
const getAppointments = dispatch => {
    return async () => {
        const response = await axios.get('/appointment/getAll');
        dispatch({ type: 'get_appointments', payload: response.data });
    };
};

const deleteAppointment = dispatch => {
    return async id => {
        await axios.delete('/appointment/delete', {
            params: {
                id
            }
        });
        // ??? to delete?
        getAppointments();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const editAppointment = dispatch => {
    return async (appointmentId, startDate, percentageValueToAdd, clientId, employeeId, workIds, note, callback) => {
        const formattedDate = format(startDate, 'dd.MM.yyyy HH:mm').replace(/\./g, '/');
        startDate = formattedDate.substring(0, 10) + " " + formattedDate.substring(11, 16);
        let appointment = {
            appointmentId,
            startDate,
            clientId,
            employeeId,
            workIds,
            percentageValueToAdd,
            note
        };
        console.log(appointment);
        await axios.put('appointment/update', appointment);
        dispatch({
            type: 'edit_appointment',
            payload: { appointmentId, startDate, clientId, employeeId, workIds, percentageValueToAdd }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    appointmentReducer,
    { addAppointment, getAppointments, deleteAppointment, editAppointment },
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