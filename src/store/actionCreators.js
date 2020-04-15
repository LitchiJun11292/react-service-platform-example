import {
    SET_USER_LOGIN,
    SET_USER_TOKEN,
    INIT_USER_INFOS,
    EXIT_DATA_RESET,
    SET_SIGN_OUT
} from './constants';

// 派发登录动作
export const setUserLogin = () => ({
    type: SET_USER_LOGIN
});

// 初始化token
export const setUserToken = (data) => ({
    type: SET_USER_TOKEN,
    data
});

// 初始化用户信息
export const initUserInfos = (data) => ({
    type: INIT_USER_INFOS,
    data
});

// 退出数据重置
export const exitDataReset = (data) => ({
    type: EXIT_DATA_RESET,
    data
});

// 派发用户登出
export const setSignOut = (data) => ({
    type: SET_SIGN_OUT,
    data
});
