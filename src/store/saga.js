/**
 * saga
 */
import Axios from "./../utils/request";
import {call, put, takeLatest} from "redux-saga/effects";
import base from './../utils/base';
import {message} from "antd";
import store from './configureStore';
import {
    setUserToken,
    initUserInfos,
    exitDataReset
} from "./actionCreators";
import {
    SET_USER_LOGIN,
    SET_SIGN_OUT
} from "./constants";

export default function* appSaga () {
    // yield ...
    yield takeLatest(SET_USER_LOGIN, setUserLogin);
    // 解决dispatch 带参问题
    yield takeLatest(SET_SIGN_OUT, (params) => setSignOut(params));
}

// 登录
function* setUserLogin () {
    try {
        const res = yield Axios.get("/security/user/login");
        const action = setUserToken(res);
        yield put(action);
        yield base.setCookie('token', "Bearer " + res, 3);
        yield call(getUserInfos);
        message.success('登录成功');
    } catch (e) {
        message.warning('网络请求失败');
    }

}

// 获取用户数据
function* getUserInfos () {
    try {
        const res = yield Axios.get("/userInfo/currentUserInfo");
        const action = initUserInfos(res);
        yield put(action);
    } catch (e) {
        message.warning('网络请求失败');
    }

}

// 用户退出登录
function* setSignOut (params) {
    try {
        const res = yield Axios.get("/security/user/logout");
        const action = setUserToken(res);
        yield put(action);
        yield put(exitDataReset(
            {
                token: '',
                userInfos: {}
            }));
        yield base.setCookie('token', '', -1);
        for (let key in store.injectedReducers) {
            if (key !== 'users') {
                yield put({
                    type: key + '/CLEAR_DATA'
                });
            }
        }
        yield params.data('/login');
        message.success('登出成功');
    } catch (e) {
        message.warning('网络请求失败');
    }

}
