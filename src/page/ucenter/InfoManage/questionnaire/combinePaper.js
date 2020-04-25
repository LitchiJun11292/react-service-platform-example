import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tabs, Dropdown, Menu } from 'antd';
import { optionsType, optionsTemplate } from './../../../../utils/questionOptions.js';
import { setOptionIndex } from './../../admin/actionCreators.js';
import TitleModal from './component/titleModal.js';
import QuestionItem from './component/QuestionItem';
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
        indexEdit: null
    };

    onClick = ({ key }) => {
        this.setState((state, props) => {
            let questionList = [...state.questionList];
            let index = this.props.optionIndex;
            questionList.push(optionsTemplate[key](index));
            this.props.setOptionIndexs(index + 2);
            return {
                questionList: questionList
            }
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

    handlEdit = (objarr, i, obj) => {
        // 更新:update  添加:add  减少:delete  反向:reverse  上移：moveUp 下移：moveDown
        if (i === (obj.keys.length - 1)) {
            switch (obj.type) {
                case 'update':
                    objarr[obj.keys[i]] = obj.val;
                    return false;
                case 'add':
                    objarr[obj.keys[i]].splice(obj.opIndex + 1, 0, {
                        label: '',
                        value: this.props.optionIndex + 1
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
        this.handlEdit(objarr[obj.keys[i]], i + 1, obj);
    };

    handleOnChange = (obj) => {
        this.setState((state, props) => {
            let questionList = [...state.questionList];
            this.handlEdit(questionList, 0, obj);
            return {
                questionList: questionList
            }
        });
    };

    handleQuestionItem = () => {
        return (
            <div className="surveycontent">
                {
                    this.state.questionList.map((item, index) =>
                        (<QuestionItem key={index}
                            handleEdit={this.handleEdit}
                            handleOnChange={this.handleOnChange}
                            {...item} keys={index} />))
                }
            </div>
        )
    };

    handleEdit = (index, type) => {
        let questionList = [...this.state.questionList];
        if (this.state.indexEdit !== null) {
            delete questionList[this.state.indexEdit].isEdit;
        }
        if (type === 'update') {
            questionList[index].isEdit = true;
        }
        this.setState({
            questionList,
            indexEdit: index
        });
    };

    componentDidMount() {
        console.log(this.props.optionIndex);
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
                <div id="divId" className="surveyhead" title="编辑问卷标题与问卷说明"
                    onClick={() => {
                        this.handleVisible('titleVisible', true);
                    }}>
                    <h1 className="pater_title" title="标题">{this.state.question.title || '标题1'}</h1>
                    <div className="surveydescription">{this.state.question.decr || '添加问卷说明'}</div>
                </div>
                {this.handleQuestionItem()}
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
