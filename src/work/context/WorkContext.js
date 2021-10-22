import createDataContext from '../../../createDataContext';
import axios from './WorkApi';

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
        let work = {
            name,
            price,
            hoursDuration,
            minutesDuration,
            iconName
        };

        await axios.post('/work/create', work);

        if (callback) {
            callback();
        };
    };
}
const getWorks = dispatch => {
    return async () => {
        const response = await axios.get('/work/getAll');
        dispatch({ type: 'get_works', payload: response.data });
    };
};

const deleteWork = dispatch => {
    return async id => {
        await axios.delete('/work/delete', {
            params: {
                id
            }
        });
        getWorks();
        //dispatch({ type: 'delete_client', payload: id });
    };
};

const editWork = dispatch => {
    return async (id, name, price, hoursDuration, minutesDuration, iconName, callback) => {
        let work = {
            id,
            name,
            price,
            hoursDuration,
            minutesDuration,
            iconName,
        };
        await axios.put('work/update', work);
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