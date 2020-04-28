import React from 'react';
import Radios from './../../questionType/Radios';
import CKEditor from '@/components/CKEditors';
import OptionOperation from './../OptionOperation';
import {Row, Col, Button} from 'antd';
import {
    FormOutlined,
    CopyOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import './index.scss';

class QuestionItem extends React.Component {
    static defaultProps = {
        isEdit: false
    };

    state = {isEdit: false};

    componentDidMount () {
        const {isEdit, handleEdit, id} = this.props;
        if (isEdit) {
            handleEdit({
                type: 'add',
                id
            });
        }
    }

    // componentWillReceiveProps(prop) {
    // };

    shouldComponentUpdate (nextProps, nextState) {
        return true;
    }

    handleType = () => {
        const {type} = this.props;
        switch (type) {
            case 'd01':
                return <Radios {...this.props} disabled={true}/>;
            default:
                return;
        }
    };

    handleOperation = () => {
        const {type} = this.props;
        switch (type) {
            case 'd01':
                return <OptionOperation
                    onOptionsEdit={this.onOptionsEdit}
                    {...this.props} />;
            default:
                return;
        }
    };

    onOptionsEdit = (obj) => {
        this.props.handleOnChangeOpt(obj);
    };

    onChangeEditor = (evt) => {
        this.props.handleOnChangeOpt({
            keys: [this.props.keys, 'title'],
            type: 'update',
            val: evt.editor.getData()
        });
    };


    handleOprateOrder = (e, type) => {
        e.stopPropagation();
        this.props.handleOnOpaList({
            keys: this.props.keys,
            type
        });
    };

    handleInserOrder = (e, id) => {
        e.stopPropagation();
        this.props.handleInserOrder(this.props.inserOrder === id ? null : id);
    };

    render () {
        const {handleEdit, id} = this.props;

        return (
            <div className={`question_item ${this.props.isEdit ? 'is_active' : ''}`}>
                <div onClick={() => {
                    handleEdit({
                        type: 'update',
                        id,
                        val: !this.props.isEdit
                    });
                }}>
                    {this.handleType()}
                    <Row className={`question_opa ${this.props.isEdit ? 'is_active' : ''}`}>
                        <Col flex="115px" className="question_left"
                             onClick={(e) => {
                                 this.handleInserOrder(e, id);
                             }}>{this.props.inserOrder === id ? '取消插入点' : '在此题后插入新题'}</Col>
                        <Col flex="auto" className="question_right">
                            <Button size="small" icon={<FormOutlined/>}
                                    onClick={(e) => {
                                        this.handleOprateOrder(e, 'update')
                                    }}>编辑</Button>
                            <Button size="small" icon={<CopyOutlined/>}
                                    onClick={(e) => {
                                        this.handleOprateOrder(e, 'copy')
                                    }}>复制</Button>
                            <Button size="small" icon={<DeleteOutlined/>}
                                    onClick={(e) => {
                                        this.handleOprateOrder(e, 'delete')
                                    }}>删除</Button>
                            <Button size="small" icon={<ArrowUpOutlined/>}
                                    onClick={(e) => {
                                        this.handleOprateOrder(e, 'moveUp')
                                    }}>上移</Button>
                            <Button size="small" icon={<ArrowDownOutlined/>}
                                    onClick={(e) => {
                                        this.handleOprateOrder(e, 'moveDown')
                                    }}>下移</Button>
                            <Button size="small" icon={<VerticalAlignTopOutlined/>}
                                    onClick={(e) => {
                                        this.handleOprateOrder(e, 'first')
                                    }}>最前</Button>
                            <Button size="small" icon={<VerticalAlignBottomOutlined/>}
                                    onClick={(e) => {
                                        this.handleOprateOrder(e, 'last')
                                    }}>最后</Button>
                        </Col>
                    </Row>
                </div>
                {
                    this.props.isEdit ?
                        <div className="question_edit">
                            <span className="edit_arrow"/>
                            <CKEditor onChange={this.onChangeEditor}
                                      data={this.props.title}/>
                            {this.handleOperation()}
                        </div> : ''
                }

            </div>
        )
    }
}

export default QuestionItem;
