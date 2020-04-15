import * as constants from './constants';

let menuConfig = {
    // 高校角色
    [constants.COLLEGE]:[
        {
            title: "办事大厅",
            url: "/ucenter/service/hall"
        },
        {
            title: "组织架构",
            url: "organ",
            children: [
                {
                    title: "高校信息",
                    url: "/ucenter/organ/collectInformation"
                },
                {
                    title: "学习中心",
                    url: "/ucenter/organ/learningCenter"
                },
                {
                    title: "函授站点",
                    url: "/ucenter/organ/correspondence"
                }
            ]
        },
        {
            title: "登记备案中心",
            url: "regrec",
            children: [
                {
                    title: "登记备案",
                    url: "/ucenter/regrec/registration"
                },
                {
                    title: "变更进度查询",
                    url: "/ucenter/regrec/progressQuery"
                }
            ]
        },
        {
            title: "信息管理",
            url: "Inform",
            children: [
                {
                    title: "投稿管理",
                    url: "/ucenter/Inform/contribute"
                }
            ]
        },
        {
            title: "系统管理",
            url: "system",
            children: [
                {
                    title: "用户管理",
                    url: "/ucenter/system/userManagement"
                },
                {
                    title: "角色管理",
                    url: "/ucenter/system/roleManagement"
                }
            ]
        }
    ],
    // 管理员
    [constants.MANAGE]:[
        {
            title: "办事大厅",
            url: "/ucenter/service/hall"
        },
        {
            title: "组织架构",
            url: "organ",
            children: [
                {
                    title: "高校信息",
                    url: "/ucenter/organ/collectInformation"
                },
                {
                    title: "学习中心",
                    url: "/ucenter/organ/learningCenter"
                },
                {
                    title: "函授站点",
                    url: "/ucenter/organ/correspondence"
                }
            ]
        },
        {
            title: "登记备案中心",
            url: "regrec",
            children: [
                {
                    title: "登记备案",
                    url: "/ucenter/regrec/registration"
                },
                {
                    title: "变更进度查询",
                    url: "/ucenter/regrec/progressQuery"
                }
            ]
        },
        {
            title: "信息管理",
            url: "Inform",
            children: [
                {
                    title: "投稿管理",
                    url: "/ucenter/Inform/contribute"
                }
            ]
        },
        {
            title: "系统管理",
            url: "system",
            children: [
                {
                    title: "用户管理",
                    url: "/ucenter/system/userManagement"
                },
                {
                    title: "角色管理",
                    url: "/ucenter/system/roleManagement"
                }
            ]
        }
    ],
};

export default menuConfig;


