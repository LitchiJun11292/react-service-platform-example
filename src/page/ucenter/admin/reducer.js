/**
 * reducer
 */
import {
    INIT_TABLES_ROUTELIST,
    RESET_DATA,
    CLEAR_DATA
} from './constants';

// const initialState = {
//     tableRouteList: []
// };

const initialState = () => ({
    tableRouteList: []
});


// 处理tabs页的增删改
const tablesRoutelist = (state, action) => {
    switch (action.opa) {
        case 0:
            return Object.assign({}, state, {tableRouteList: [action.data[0]]});
        case -1:
            return Object.assign({}, state, {tableRouteList: action.data});
        default:
            let Index = state.tableRouteList.findIndex(item => action.data.url === item.url);
            if (Index === -1) {
                state.tableRouteList.push(action.data);
            }
            return Object.assign({}, state);
    }
};

export default function appReducer(state = initialState(), action) {
    switch (action.type) {
        case INIT_TABLES_ROUTELIST:
            return tablesRoutelist(state, action);
        case RESET_DATA:
            let resetDates = action.data.tableRouteList;
            return Object.assign({}, state, {tableRouteList: resetDates});
        case CLEAR_DATA:
            return initialState();
        default:
            return state;
    }
}
