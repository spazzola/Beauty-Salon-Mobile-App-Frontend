import createDataContext from '../../../createDataContext';
//import axios from './WorkApi';
import { Alert } from 'react-native';
import axios from '../../../axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const workReducer = (state, action) => {
    switch (action.type) {
        case 'get_works':
            return action.payload;
        case 'delete_work':
            return state.filter(work => work.id !== action.payload);
        case 'edit_work':
            return state.map(work => {
                return work.id === action.payload.id ? action.payload : work;
            });
        default:
            return state;
    }
}

const addWork = dispatch => {
    return async (name, price, hoursDuration, minutesDuration, iconName, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        let work = {
            name,
            price,
            hoursDuration,
            minutesDuration,
            iconName
        };

        await axios.post('/work/create', work, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie dodano usługi. \nKod błędu: " + error.response.status);
            });

        if (callback) {
            callback();
        };
    };
}
const getWorks = dispatch => {
    return async () => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/work/getAll', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'get_works', payload: response.data });
    };
};

const deleteWork = dispatch => {
    return async id => {
        const jwt = await AsyncStorage.getItem('jwt');
        await axios.delete('/work/delete', {
            params: {
                id
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).catch(error => {
            Alert.alert("Błąd ", "Nie usunięto usługi. \nKod błędu: " + error.response.status);
        });
        getWorks();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const editWork = dispatch => {
    return async (id, name, price, hoursDuration, minutesDuration, iconName, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        let work = {
            id,
            name,
            price,
            hoursDuration,
            minutesDuration,
            iconName,
        };
        await axios.put('work/update', work, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
        .catch(error => {
            Alert.alert("Błąd ", "Nie zaktualizowano usługi. \nKod błędu: " + error.response.status);
        });

        dispatch({
            type: 'edit_work',
            payload: { id, name, price, hoursDuration, minutesDuration, iconName }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    workReducer,
    { addWork, getWorks, deleteWork, editWork },
    []);