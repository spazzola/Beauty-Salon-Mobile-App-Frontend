import createDataContext from '../../../createDataContext';
import axios from './CostApi';
import { format } from 'date-fns'

const costReducer = (state, action) => {
    switch (action.type) {
        case 'get_costs':
            return action.payload;
        case 'delete_cost':
            return state.filter(cost => cost.id !== action.payload);
        case 'edit_cost':
            return state.map(cost => {
                return cost.id === action.payload.id ? action.payload : cost;
            });
        default:
            return state;
    }
}

const addCost = dispatch => {
    return async (name, value, addedDate, callback) => {
            addedDate = format(addedDate, 'dd.MM.yyyy hh:mm').replace(/\./g, '/');
        let cost = {
            name,
            value,
            addedDate
        };

        await axios.post('/cost/create', cost);

        if (callback) {
            callback();
        };
    };
}
const getCosts = dispatch => {
    return async (month, year) => {
        const response = await axios.get('/cost/getMonthCosts', {
            params: {
                month: month,
                year: year
            }
        });
        dispatch({ type: 'get_costs', payload: response.data });
    };
};

const deleteCost = dispatch => {
    return async id => {
        await axios.delete('/cost/delete', {
            params: {
                id
            }
        });
        getCosts();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const editCost = dispatch => {
    return async (id, name, value, addedDate, callback) => {
        addedDate = format(addedDate, 'dd.MM.yyyy hh:mm').replace(/\./g, '/');
        let cost = {
            id,
            name,
            value,
            addedDate
        };
        await axios.put('cost/update', cost);
        dispatch({
            type: 'edit_cost',
            payload: { id, name, value }
        });
        if (callback) {
            callback();
        }
    };
};

export const { Context, Provider } = createDataContext(
    costReducer,
    { addCost, getCosts, deleteCost, editCost },
    []);