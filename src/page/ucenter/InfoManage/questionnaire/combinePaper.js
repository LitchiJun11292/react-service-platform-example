import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Tabs, Dropdown, Menu} from 'antd';
import TitleModal from './component/titleModal.js';
import './index.scss';
import LinksModal from "./linksModal";

const {TabPane} = Tabs;

class AddQuestion extends React.Component {

    state = {
        titleVisible: false,
        question: {
            title: '666',
            decr: ''
        },
        typesList: [
            {
                title: '选择题',
                key: 1,
                options: [
                    {
                        title: '单选',
                        key: 'd01'
                    },
                    {
                        title: '多选',
                        key: 'd02'
                    }
                ]
            },
            {
                title: '填空题',
                key: 2,
                options: [
                    {
                        title: '单选填空',
                        key: 'd01'
                    },
                    {
                        title: '多选填空',
                        key: 'd02'
                    }
                ]
            },
            {
                title: '分页说明',
                key: 3,
                options: [
                    {
                        title: '单选',
                        key: 'd01'
                    },
                    {
                        title: '多选',
                        key: 'd02'
                    }
                ]
            }
        ],
    };

    onClick = ({key}) => {
        console.log(key);
    };

    handleMenuItem = (options) => {
        return <Menu onClick={this.onClick}>
            {
                options.map(item => (<Menu.Item key={item.key}>
                    {item.title}
                </Menu.Item>))
            }
        </Menu>
    };

    handleTabPane = () => {
        return this.state.typesList.map(item => (
            <TabPane tab={
                <Dropdown overlay={this.handleMenuItem(item.options)}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {item.title}
                    </a>
                </Dropdown>} key={item.key}/>))
    };

    handleVisible = (name, val, item) => {
        this.setState({
            [name]: val,
            itemInfo: item ? item : {}
        })
    };

    handleOk = (name, obj) => {
        this.setState({
            [name]: obj
        });
        console.log(name);
        console.log(obj);
    };

    render () {

        return (
            <div className="combine_paper">
                <Tabs type="card">
                    {this.handleTabPane()}
                </Tabs>
                <div id="divId" className="surveyhead" title="编辑问卷标题与问卷说明"
                     onClick={() => {
                         this.handleVisible('titleVisible', true);
                     }}>
                    <h1 className="pater_title" title="标题">{this.state.question.title || '标题1'}</h1>
                    <div className="surveydescription">{this.state.question.decr || '添加问卷说明'}</div>
                </div>
                <TitleModal titleVisible={this.state.titleVisible}
                            question={this.state.question}
                            handleOk={this.handleOk}
                            handleVisible={this.handleVisible}/>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(AddQuestion));
