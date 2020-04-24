import {
    INIT_TABLES_ROUTELIST,
    RESET_DATA,
    SET_OPTION_INDEX
} from './constants';

// tabs页路由列表
export const initTablesRoutelist = (data, opa) => ({
    type: INIT_TABLES_ROUTELIST,
    data,
    opa
});

// 刷新ucenter数据重置
export const resetData = (data) => ({
    type: RESET_DATA,
    data
});

// 组卷页面选项索引值
export const setOptionIndex = (data) => ({
    type: SET_OPTION_INDEX,
    data
});



