import createDataContext from '../../../createDataContext';
import axios from '../../../axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reportReducer = (state, action) => {
    switch (action.type) {
        case 'generate_monthly_report':
            return action.payload;
        default:
            return state;
    }
}
const generateMonthlyReport = dispatch => {
    return async (month, year) => {
        const jwt = await AsyncStorage.getItem('jwt');
        const response = await axios.get('/report/generateMonthlyReport', {
            params: {
                month: month,
                year: year
            },
            headers: {
                'Authorization': 'Bearer ' + jwt
            }
        });
        dispatch({ type: 'generate_monthly_report', payload: response.data });
    };
};

export const { Context, Provider } = createDataContext(
    reportReducer,
    { generateMonthlyReport },
    []);