import createDataContext from '../../../createDataContext';
import { Alert } from 'react-native';
import axios from '../../../axios-config';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const settingsReducer = (state, action) => {
    switch (action.type) {
        case 'get_all_vacations':
            return action.payload;
        case 'edit_vacation':
            return state.map(vacation => {
                return vacation.id === action.payload.id ? action.payload : vacation;
            });
        default:
            return state;
    }
}

const createVacation = dispatch => {
    return async (startDate, finishDate, userId, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        var vacation = {
            startDate,
            finishDate,
            employeeId: userId
        }
        await axios.post('/vacation/create', vacation, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie dodano urlopu. \nKod błędu: " + error.response.status);
            });;

        if (callback) {
            callback();
        };
    };
}
const getAllVacations = dispatch => {
    return async () => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/vacation/getAll', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'get_all_vacations', payload: response.data });
    };
};

const deleteVacation = dispatch => {
    return async id => {
        const jwt = await AsyncStorage.getItem('jwt');
        await axios.delete('/vacation/delete', {
            params: {
                id
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).catch(error => {
            Alert.alert("Błąd ", "Nie usunięto urlopu. \nKod błędu: " + error.response.status);
        });
    };
};

const editVacation = dispatch => {
    return async (id, startDate, finishDate, employeeId, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        let vacation = {
            id,
            startDate,
            finishDate,
            employeeId
        };
        await axios.put('vacation/update', vacation, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).catch(error => {
            Alert.alert("Błąd ", "Nie zaktualizowano urlopu. \nKod błędu: " + error.response.status);
        });

        dispatch({
            type: 'edit_vacation',
            payload: { id, startDate, finishDate, employee: {id: employeeId} }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    settingsReducer,
    { createVacation, getAllVacations, deleteVacation, editVacation },
    []);