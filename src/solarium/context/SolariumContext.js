import createDataContext from '../../../createDataContext';
//import axios from './SolariumApi';
import { Alert } from 'react-native';
import axios from '../../../axios-config';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const solariumReducer = (state, action) => {
    switch (action.type) {
        case 'get_month_solarium':
            return action.payload;
        default:
            return state;
    }
}

const useSolarium = dispatch => {
    return async (usedTime, usedDate, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        usedDate = format(usedDate, 'dd.MM.yyyy hh:mm').replace(/\./g, '/');
        let solarium = {
            usedDate,
            usedTime
        };

        await axios.post('/solarium/use', solarium, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie dodano użycia solarium. \nKod błędu: " + error.response.status);
            });;

        if (callback) {
            callback();
        };
    };
}
const getMonthSolarium = dispatch => {
    return async (month, year) => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/solarium/getMonthSolarium', {
            params: {
                month: month,
                year: year
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'get_month_solarium', payload: response.data });
    };
};

export const { Context, Provider } = createDataContext(
    solariumReducer,
    { useSolarium, getMonthSolarium },
    []);