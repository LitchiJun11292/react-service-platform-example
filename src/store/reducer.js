/**
 * reducer
 */
import {
    SET_USER_TOKEN,
    INIT_USER_INFOS,
    EXIT_DATA_RESET
} from './constants';
import {fromJS} from "immutable";

const initialState = {
    token: '',
    userInfos: {}
};

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SET_USER_TOKEN:
            return Object.assign({}, state, {token: action.data});
        case INIT_USER_INFOS:
            return Object.assign(state, {userInfos: action.data});
        case EXIT_DATA_RESET:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
