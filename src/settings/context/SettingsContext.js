import createDataContext from '../../../createDataContext';
import { Alert } from 'react-native';
import axios from '../../../axios-config';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const settingsReducer = (state, action) => {
    switch (action.type) {
        case 'get_month_solarium':
            return action.payload;
        default:
            return state;
    }
}

const createVacation = dispatch => {
    return async (startDate, finishDate, userId, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        var vacation= {
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
// const getMonthSolarium = dispatch => {
//     return async (month, year) => {
//         const jwt = await AsyncStorage.getItem('jwt');
//         const response = await axios.get('/solarium/getMonthSolarium', {
//             params: {
//                 month: month,
//                 year: year
//             },
//             headers: {
//                 'Authorization': 'Bearer ' + jwt
//             }
//         });
//         dispatch({ type: 'get_month_solarium', payload: response.data });
//     };
// };

export const { Context, Provider } = createDataContext(
    settingsReducer,
    { createVacation },
    []);