import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from '../../../createDataContext';
import axios from '../../../axios-config';
import { navigate } from '../../navigationRef';
import { Alert } from 'react-native';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return action.payload;
        default:
            return state;
    }
};

const signin = dispatch => async ({ login, password }) => {
    try {
        const response = await axios.post('/user/authenticate',  { login: login, password: password });
        await AsyncStorage.setItem('jwt', response.data.jwt);
        dispatch({ type: 'signin', payload: response.data });
        navigate('mainFlow');
    } catch (error) {
        Alert.alert("Błąd ", "Logowanie nie powiodło się. Sprawdź login oraz hasło. \nKod błędu: " + error.response.status);
    }
};


export const { Provider, Context } = createDataContext(
    authReducer,
    { signin },
    { isSignedIn: false }
)