import {
    INIT_TABLES_ROUTELIST,
    RESET_DATA,
    RESET_DATA_DIS,
    CLEAR_DATA
} from './constants';

// tabs页路由列表
export const initTablesRoutelist = (data, opa) => ({
    type: INIT_TABLES_ROUTELIST,
    data,
    opa
});

// 刷新ucenter数据重置派发
export const resetDataDis = (data) => ({
    type: RESET_DATA_DIS
});


// 刷新ucenter数据重置
export const resetData = (data) => ({
    type: RESET_DATA,
    data
});



