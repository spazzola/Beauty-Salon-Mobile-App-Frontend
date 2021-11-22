import createDataContext from '../../../createDataContext';
//import axios from './UserApi';
import { Alert } from 'react-native';
import axios from '../../../axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userReducer = (state, action) => {
    switch (action.type) {
        case 'get_users':
            return action.payload;
        case 'delete_user':
            return state.filter(user => user.id !== action.payload);
        case 'edit_user':
            return state.map(user => {
                return user.id === action.payload.id ? action.payload : user;
            });
        default:
            return state;
    }
}

const addUser = dispatch => {
    return async (name, surname, phoneNumber, login, password, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        let user = {
            name,
            surname,
            phoneNumber,
            login,
            password
        };
        await axios.post('/user/register', user, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie dodano pracownika. \nKod błędu: " + error.response.status);
            });

        if (callback) {
            callback();
        };
    };
}
const getUsers = dispatch => {
    return async () => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/user/getAll', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'get_users', payload: response.data });
    };
};

const deleteUser = dispatch => {
    return async id => {
        const jwt = await AsyncStorage.getItem('jwt');
        await axios.delete('/user/delete', {
            params: {
                id
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).catch(error => {
            Alert.alert("Błąd ", "Nie zaktualizowano pracownika. \nKod błędu: " + error.response.status);
        });
        getUsers();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const editUser = dispatch => {
    return async (id, name, surname, phoneNumber, login, password, role, visible, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        let user = {
            id,
            name,
            surname,
            phoneNumber,
            login,
            password,
            role,
            visible
        };

        await axios.put('user/update', user, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie zaktualizowano pracownika. \nKod błędu: " + error.response.status);
            });
            
        dispatch({
            type: 'edit_user',
            payload: { id, name, surname, phoneNumber, login, password, role, visible }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    userReducer,
    { addUser, getUsers, deleteUser, editUser },
    []);