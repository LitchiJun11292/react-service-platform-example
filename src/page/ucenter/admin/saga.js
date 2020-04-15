/**
 * saga
 */
import {takeLatest, put} from "redux-saga/effects";
import {
    resetData
} from "./actionCreators";
import {
    RESET_DATA_DIS
} from './constants';

export default function* appSaga() {
    // yield ...
    yield takeLatest(RESET_DATA_DIS, resetDatas);
}

function* resetDatas() {
    const states = yield JSON.parse(sessionStorage.getItem('states'));
    if (states && states.ucenter) {
        yield put(resetData(states.ucenter));
    }
}