import React from 'react';
import { withRouter} from 'react-router-dom';
import {Button} from 'antd';
import BaseForm from './../../../../components/BaseForm';
import ETable from './../../../../components/ETable';
import Axios from "./../../../../utils/request";
import OnlineModal from './onlineModal.js';
import LinksModal from './linksModal.js';
import './index.scss';

class Questionnaire extends React.Component {

    state = {
        formDate: {
            // 'questionnaire_name': 55,
            // 'post_status': 'lucy'
        },
        list: [],
        pagination: {},
        onlineVisible: false,
        linksVisible: false

    };

    formList = [
        {
            type: 'INPUT',
            label: '',
            field: 'questionnaire_name',
            width: 130,
            placeholder: '问卷名称'
        },
        {
            type: 'SELECT',
            label: '',
            field: 'post_status',
            width: 130,
            placeholder: '发布状态',
            list: [
                {
                    id: '0',
                    name: '全部'
                },
                {
                    id: '1',
                    name: '已发布'
                },
                {
                    id: '2',
                    name: '下线'
                },
                {
                    id: '3',
                    name: '上线'
                }
            ]
        },
        {
            type: 'DatePickers',
            label: '',
            field: ['start_time', 'end_time'],
            width: 130,
            placeholder: ['创建开始时间', '创建结束时间']
        }
    ];

    params = {
        page: 1
    };

    componentDidMount () {
        this.requestList();
    }

    // 默认请求我们的接口数据
    requestList = () => {
        // Axios.requestList(this, '/questionnaire/list', this.params, true);
        Axios.requestList(this, '/questionnaire/list', {}, true);
    };

    handleVisible = (name, val, item) => {
        this.setState({
            [name]: val,
            itemInfo: item ? item : {}
        })
    };

    handleOk = (name, obj) => {
        console.log(name);
        console.log(obj);
    };

    hanldePush = (url, data) => {
        this.props.history.push({pathname: url, state: data});
    };

    hanldePushCombine = (record) => {
        this.props.history.push({
            pathname: `/ucenter/Inform/combinePaper/${record.id}`,
            state: {
                id: record.id
            }
        });
    };

    render () {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '问卷名称',
                dataIndex: 'questionnaire_name',
                key: 'questionnaire_name',
            },
            {
                title: '主题',
                dataIndex: 'theme',
                key: 'theme',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
                render (val) {
                    return ['匿名', '实名'][val];
                }
            },
            {
                title: '发布状态',
                dataIndex: 'post_status',
                key: 'post_status',
                render (val) {
                    return ['未发布', '已发布'][val];
                }
            },
            {
                title: '上线状态',
                dataIndex: 'online_status',
                key: 'online_status',
                render (val) {
                    return ['上线', '下线'][val];
                }
            },
            {
                title: '创建时间',
                dataIndex: 'creation_time',
                key: 'creation_time',
            },
            {
                title: '操作',
                dataIndex: 'operating',
                key: 'operating',
                render: (text, record) => {
                    let arr = [];
                    if (record['post_status'] === 0) {
                        arr.push(
                            <Button type="link" key="0">发布</Button>,
                            <Button type="link" key="1">预览</Button>,
                            <Button type="link" key="2">撤回</Button>,
                            <Button type="link" key="3">修改</Button>,
                            <Button type="link" key="4">删除</Button>,
                        )

                    } else {
                        arr.push(<Button type="link" key="5">预览</Button>);

                        if (record['online_status'] === 0) {
                            arr.push(<Button type="link" key="6">下线</Button>)
                        } else {
                            arr.push(<Button type="link" key="7"
                                             onClick={() => {
                                                 this.handleVisible('onlineVisible', true, record)
                                             }}>上线</Button>)
                        }
                        arr.push(
                            <Button type="link" key="8"
                                    onClick={() => {
                                        this.handleVisible('linksVisible', true, record)
                                    }}
                            >生成外链</Button>,
                            <Button type="link" key="9" onClick={() => {
                                this.hanldePushCombine(record)
                            }}>组卷</Button>,
                            <Button type="link" key="10">问卷结果</Button>)
                    }
                    return (<span>{arr}</span>)
                }
            }
        ];

        return (
            <div>
                <BaseForm formList={this.formList}
                          formDate={this.state.formDate}/>
                <div className="questionnaire_add">
                    <Button type="primary" onClick={() => {
                        this.hanldePush('/ucenter/Inform/addQuestion', {})
                    }}>新增问卷</Button>
                </div>
                <ETable dataSource={this.state.list}
                        columns={columns}
                        pagination={this.state.pagination}/>
                <OnlineModal item={this.state.itemInfo}
                             handleVisible={this.handleVisible}
                             handleOk={this.handleOk}
                             onlineVisible={this.state.onlineVisible}/>
                <LinksModal linksVisible={this.state.linksVisible}
                            handleOk={this.handleOk}
                            handleVisible={this.handleVisible}/>
            </div>
        )
    }
}

export default withRouter(Questionnaire);
