import createDataContext from '../../../createDataContext';
import axios from './SolariumApi';
import { format } from 'date-fns'

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
        usedDate = format(usedDate, 'dd.MM.yyyy hh:mm').replace(/\./g, '/');
        let solarium = {
            usedDate,
            usedTime
        };

        await axios.post('/solarium/use', solarium);
        
        if (callback) {
            callback();
        };
    };
}
const getMonthSolarium = dispatch => {
    return async (month, year) => {
        console.log("pobieranie solarium");
        const response = await axios.get('/solarium/getMonthSolarium', {
            params: {
                month: month,
                year: year
            }
        });
        dispatch({ type: 'get_month_solarium', payload: response.data });
    };
};

export const { Context, Provider } = createDataContext(
    solariumReducer,
    { useSolarium, getMonthSolarium },
    []);