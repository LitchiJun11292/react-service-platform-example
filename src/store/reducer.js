/**
 * reducer
 */
import {
    SET_USER_TOKEN,
    INIT_USER_INFOS,
    SET_USER_TARGET,
    EXIT_DATA_RESET
} from './constants';

const initialState = {
    token: null,
    target: 'college',
    userInfos: {}
};

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SET_USER_TOKEN:
            return Object.assign({}, state, {token: action.data});
        case SET_USER_TARGET:
            return Object.assign({}, state, {target: action.data});
        case INIT_USER_INFOS:
            return Object.assign({}, state, {userInfos: action.data});
        case EXIT_DATA_RESET:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
