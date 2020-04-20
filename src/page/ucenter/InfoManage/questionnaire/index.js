import React from 'react';
import {Button} from 'antd';
import BaseForm from './../../../../components/BaseForm';
import './index.scss';

class Questionnaire extends React.Component {

    state = {
        formDate: {
            // 'questionnaire_name': 55,
            // 'post_status': 'lucy'
        }
    };

    formList = [
        {
            type: 'INPUT',
            label: '问卷名称',
            field: 'questionnaire_name',
            width: 130,
            placeholder: '请输入问卷名称'
        },
        {
            type: 'SELECT',
            label: '发布状态',
            field: 'post_status',
            width: 130,
            placeholder: '请选择状态',
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
            label: '创建时间',
            field: ['start_time', 'end_time'],
            width: 130,
            placeholder: ['日期选择', '日期选择']
        }
    ];

    render () {
        return (
            <div>
                <BaseForm formList={this.formList}
                          formDate={this.state.formDate}/>
                <div className="questionnaire_add">
                    <Button type="primary">新增问卷</Button>
                </div>
            </div>
        )
    }
}

export default Questionnaire;
