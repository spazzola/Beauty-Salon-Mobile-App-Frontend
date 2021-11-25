import createDataContext from '../../../createDataContext';
import { Alert } from 'react-native';
//import axios from './ClientApi';
import axios from '../../../axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clientReducer = (state, action) => {
    switch (action.type) {
        case 'get_clients':
            return action.payload;
        case 'delete_client':
            return state.filter(client => client.id !== action.payload);
        case 'edit_client':
            return state.map(client => {
                return client.id === action.payload.id ? action.payload : client;
            });
        default:
            return state;
    }
}

const addClient = dispatch => {
    return async (name, surname, phoneNumber, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        let client = {
            name,
            surname,
            phoneNumber
        };
        await axios.post('/client/create', client, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie dodano klienta. \nKod błędu: " + error.response.status);
            });

        if (callback) {
            callback();
        };
    };
}
const getClients = dispatch => {
    return async () => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/client/getAll', {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'get_clients', payload: response.data });
    };
};

const deleteClient = dispatch => {
    return async id => {
        const jwt = await AsyncStorage.getItem('jwt');
        await axios.delete('/client/delete', {
            params: {
                id
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).catch(error => {
            Alert.alert("Błąd ", "Nie usunięto klienta. \nKod błędu: " + error.response.status);
        });
        //getClients();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const sendBelated = dispatch => {
    return async id => {
        const jwt = await AsyncStorage.getItem('jwt');
        await axios.put('/client/belated', null, {
            params: {
                id
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        }).then(response => {
            const client = response.data;
            const name = client.name;
            const surname = client.surname;
            const phoneNumber = client.phoneNumber;
            const belatedCounter = client.belatedCounter;
            dispatch({
                type: 'edit_client',
                payload: { id, name, surname, phoneNumber, belatedCounter }
            });
        }).catch(error => {
            Alert.alert("Bład", "Nie dodano spóźnienia. \nKod błedu: " + error.response.status);
        });
        
    }
}

const editClient = dispatch => {
    return async (id, name, surname, phoneNumber, belatedCounter, callback) => {
        const jwt = await AsyncStorage.getItem('jwt');
        let client = {
            id,
            name,
            surname,
            phoneNumber,
            belatedCounter
        };
        await axios.put('client/update', client, {
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        })
            .catch(error => {
                Alert.alert("Błąd ", "Nie zaktualizowano klienta. \nKod błędu: " + error.response.status);
            });

        dispatch({
            type: 'edit_client',
            payload: { id, name, surname, phoneNumber, belatedCounter }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    clientReducer,
    { addClient, getClients, deleteClient, editClient, sendBelated },
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