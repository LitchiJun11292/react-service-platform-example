import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tabs, Dropdown, Menu, notification, Button } from 'antd';
import { optionsType, optionsTemplate } from './../../../../utils/questionOptions.js';
import { setOptionIndex } from './../../admin/actionCreators.js';
import TitleModal from './component/titleModal.js';
import QuestionItem from './component/QuestionItem';
import base from './../../../../utils/base.js';
import './index.scss';

const { TabPane } = Tabs;

class AddQuestion extends React.Component {

    state = {
        titleVisible: false,
        question: {
            title: '666',
            decr: ''
        },
        typesList: [],
        questionList: [],
        editId: null,
        inserOrder: null
    };

    onClick = ({ key }) => {
        let questionList = [...this.state.questionList];
        let index = this.props.optionIndex;
        let itemIndex = questionList.findIndex(item => (item.id === this.state.inserOrder));
        if (itemIndex > -1) {
            questionList.splice(itemIndex + 1, 0, optionsTemplate[key](index));
            this.setState({
                inserOrder: null
            });
        } else {
            questionList.push(optionsTemplate[key](index));
        }
        this.props.setOptionIndexs(index + 2);
        this.setState({
            questionList: questionList
        });
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
                    {/* eslint-disable-next-line */}
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        {item.title}
                    </a>
                </Dropdown>} key={item.key} />))
    };

    handelEditOpt = (objarr, i, obj) => {
        // 更新:update  添加:add  减少:delete  反向:reverse  上移：moveUp 下移：moveDown
        if (i === (obj.keys.length - 1)) {
            switch (obj.type) {
                case 'update':
                    objarr[obj.keys[i]] = obj.val;
                    return false;
                case 'add':
                    objarr[obj.keys[i]].splice(obj.opIndex + 1, 0, {
                        label: '',
                        value: this.props.optionIndex + 1,
                        isBlank: false,
                        id: Math.random()
                    });
                    this.props.setOptionIndexs(this.props.optionIndex + 1);
                    return false;
                case 'delete':
                    objarr[obj.keys[i]].splice(obj.opIndex, 1);
                    return false;
                case 'reverse':
                    objarr[obj.keys[i]] = objarr[obj.keys[i]].reverse();
                    return false;
                case 'moveUp':
                    if (obj.opIndex !== 0) {
                        let objs = objarr[obj.keys[i]][obj.opIndex];
                        objarr[obj.keys[i]].splice(obj.opIndex, 1);
                        objarr[obj.keys[i]].splice(obj.opIndex - 1, 0, objs);
                    }
                    return false;
                case 'moveDown':
                    if (obj.opIndex !== objarr[obj.keys[i]].length - 1) {
                        let objs = objarr[obj.keys[i]][obj.opIndex];
                        objarr[obj.keys[i]].splice(obj.opIndex, 1);
                        objarr[obj.keys[i]].splice(obj.opIndex + 1, 0, objs);
                    }
                    return false;
                default:
                    return;
            }
        }
        this.handelEditOpt(objarr[obj.keys[i]], i + 1, obj);
    };

    handleOnChangeOpt = (obj) => {
        let questionList = [...this.state.questionList];
        this.handelEditOpt(questionList, 0, obj);
        this.setState({
            questionList: questionList
        });
    };

    handleOnOpaList = (obj) => {
        // 更新:update  减少:delete  上移：moveUp 下移：moveDown  最前： first  最后： last  复制: copy
        this.setState((state, props) => {
            let questionList = [...state.questionList];
            let item = questionList[obj.keys];
            let editId = this.state.editId;

            switch (obj.type) {
                case 'delete':
                    questionList.splice(obj.keys, 1);
                    break;
                case 'update':
                    item.isEdit = true;
                    editId = obj.keys;
                    break;
                case 'moveUp':
                    if (obj.keys !== 0) {
                        questionList.splice(obj.keys, 1);
                        questionList.splice(obj.keys - 1, 0, item);
                    } else {
                        notification.warning({
                            message: '提示',
                            description:
                                '第一题不能再上移',
                        });
                    }
                    break;
                case 'moveDown':
                    if (obj.keys !== (questionList.length - 1)) {
                        questionList.splice(obj.keys, 1);
                        questionList.splice(obj.keys + 1, 0, item);
                    } else {
                        notification.warning({
                            message: '提示',
                            description:
                                '最后一题不能再下移',
                        });
                    }
                    break;
                case 'first':
                    if (obj.keys !== 0) {
                        questionList.splice(obj.keys, 1);
                        questionList.unshift(item);
                    } else {
                        notification.warning({
                            message: '提示',
                            description:
                                '第一题不能再上移',
                        });
                    }
                    break;
                case 'last':
                    if (obj.keys !== (questionList.length - 1)) {
                        questionList.splice(obj.keys, 1);
                        questionList.push(item);
                    } else {
                        notification.warning({
                            message: '提示',
                            description:
                                '最后一题不能再下移',
                        });
                    }
                    break;
                case 'copy':
                    let objs = base.deepClone(questionList[obj.keys]);
                    objs.id = Math.random();
                    objs.isEdit = true;
                    questionList.splice(obj.keys + 1, 0, objs);
                    break;
                default:
                    return;
            }

            return {
                questionList: questionList,
                editId
            }
        });
    };

    handleQuestionItem = () => {
        return (
            <div className="surveycontent">
                {
                    this.state.questionList.map((item, index) =>
                        (<QuestionItem key={item.id}
                            handleEdit={this.handleEdit}
                            handleOnChangeOpt={this.handleOnChangeOpt}
                            handleOnOpaList={this.handleOnOpaList}
                            handleInserOrder={this.handleInserOrder}
                            inserOrder={this.state.inserOrder}
                            {...item} keys={index} />))
                }
            </div>
        )
    };

    handleInserOrder = (id) => {
        this.setState({
            inserOrder: id
        });
    };

    handleEdit = (obj) => {
        let questionList = [...this.state.questionList];
        let Index = questionList.findIndex(item => (item.id === this.state.editId));
        let currentIndex = questionList.findIndex(item => (item.id === obj.id));
        if (Index > -1) {
            delete questionList[Index].isEdit;
        }

        if (obj.type === 'update' && currentIndex > -1) {
            questionList[currentIndex].isEdit = obj.val;
        }

        this.setState({
            questionList,
            editId: obj.id
        });
    };

    componentDidMount() {
        this.setState({
            typesList: optionsType
        });
    };

    render() {

        return (
            <div className="combine_paper">
                <Tabs type="card">
                    {this.handleTabPane()}
                </Tabs>
                <div className="combine_main">
                    <div id="divId" className="surveyhead" title="编辑问卷标题与问卷说明"
                        onClick={() => {
                            this.handleVisible('titleVisible', true);
                        }}>
                        <h1 className="pater_title" title="标题">{this.state.question.title || '标题1'}</h1>
                        <div className="surveydescription">{this.state.question.decr || '添加问卷说明'}</div>
                    </div>
                    {this.handleQuestionItem()}
                </div>
                <TitleModal titleVisible={this.state.titleVisible}
                    question={this.state.question}
                    handleOk={this.handleOk}
                    handleVisible={this.handleVisible} />
            </div>
        )
    }
}

const mapState = state => ({
    optionIndex: state.ucenter.optionIndex
});

const mapProps = dispatch => ({
    setOptionIndexs(index) {
        dispatch(setOptionIndex(index))
    }
});


export default connect(mapState, mapProps)(withRouter(AddQuestion));
