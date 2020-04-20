import Mock from 'mockjs';

/**
 *  login 模块
 **/
// 登录
Mock.mock('/mocks/security/user/login', {
    "successFlag": true,
    "status": 200,
    "result": /[a-z][0-9a-z]{30}/
});

// 获取用户信息
Mock.mock('/mocks/userInfo/currentUserInfo', {
    "successFlag": true,
    "status": 200,
    "result": {
        "activeFlag": true,
        "actualName": "宁波高校",
        "createAt": "2020-03-23 18:27:21",
        "id": 175,
        "idCard": "513436200003158637",
        "orgId": 210,
        "orgName": "宁波市广播电视大学",
        "phone": "15256653880",
        "target": "college",
        "updateAt": "2020-03-23 19:22:02",
        "userLevel": 1,
        "userName": "51885_ningbo",
        "userStatus": "active"
    }
});

// 用户退出登录
Mock.mock('/mocks/security/user/logout', {
    "successFlag": true,
    "status": 200,
    "result": ""
});


/**
 *  ucenter 模块
 **/
// 问卷管理
Mock.mock('/mocks/questionnaire/list', {
    "successFlag": true,
    "status": 200,
    "message": "请求成功",
    "result": {
        "item_list|5": [{
            "id|+1": 100001,
            "questionnaire_name": "2020招生问卷",
            "theme|1": ["问卷", "通知", "公告"],
            "type|0-1": 0,
            "post_status|0-1": 0,
            "online_status|0-1": 0,
            "creation_time": "2017-11-11 12:00:00"
        }],
        "page": 1,
        "page_size": 10,
        "total": 100
    },

});


/**
 *  home 模块
 **/
