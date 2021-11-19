import createDataContext from '../../../createDataContext';
import { Alert } from 'react-native';
//import axios from './ClientApi';
import axios from '../../../axios-config';

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
        let client = {
            name,
            surname,
            phoneNumber
        };
        await axios.post('/client/create', client)
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
        const response = await axios.get('/client/getAll');
        dispatch({ type: 'get_clients', payload: response.data });
    };
};

const deleteClient = dispatch => {
    return async id => {
        await axios.delete('/client/delete', {
            params: {
                id
            }
        }).catch(error => {
            Alert.alert("Błąd ", "Nie usunięto klienta. \nKod błędu: " + error.response.status);
        });
        getClients();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const editClient = dispatch => {
    return async (id, name, surname, phoneNumber, belatedCounter, callback) => {
        let client = {
            id,
            name,
            surname,
            phoneNumber,
            belatedCounter
        };
        await axios.put('client/update', client)
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
    { addClient, getClients, deleteClient, editClient },
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