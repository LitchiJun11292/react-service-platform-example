import React from 'react';
import { Row, Col, Input, Checkbox } from 'antd';
import {
    SwapOutlined,
    FileTextOutlined,
    UpCircleOutlined,
    DownCircleOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    PlusSquareOutlined
} from '@ant-design/icons';
import './index.scss';

class OptionOperation extends React.Component {

    state = {
        input: '',
        options: this.props.options
    };

    componentDidMount() {

    }


    addOrDeleteOptions = (index, type) => {
        this.props.onOptionsEdit({
            keys: [this.props.keys, 'options'],
            type: type,
            addIndex: index
        });
    };

    onBlur = (e, index) => {
    };

    onChange = (e, index) => {
        let options = [...this.state.options];
        options[index].label = e.target.value;
        // this.setState({
        //     options
        // });
        this.props.onOptionsEdit({
            keys: [this.props.keys, 'options', index, 'label'],
            type: 'update',
            val: e.target.value
        });
    };

    render() {
        return (
            <div className="option_operation">
                <Row className="option_title">
                    <Col span={12} className="first_title">
                        选项文字<SwapOutlined onClick={() => {
                                this.addOrDeleteOptions(0, 'reverse');
                            }} />
                    </Col>
                    <Col span={3}>说明</Col>
                    <Col span={3}>允许填空</Col>
                    <Col span={3}>默认</Col>
                    <Col span={3}>上移下移</Col>
                </Row>
                {this.props.options.map((item, index) =>
                    (<Row className="option_main" key={item.value}>
                        <Col span={12}>
                            <Input placeholder={`选项${item.value}`} allowClear
                                value={item.label}
                                size="small"
                                onChange={(e) => {
                                    e.persist();
                                    this.onChange(e, index);
                                }}
                                onBlur={(e) => {
                                    e.persist();
                                    this.onBlur(e, index);
                                }} />
                            <PlusCircleOutlined onClick={() => {
                                this.addOrDeleteOptions(index, 'add');
                            }} />
                            <MinusCircleOutlined onClick={() => {
                                this.addOrDeleteOptions(index, 'delete');
                            }} />
                        </Col>
                        <Col span={3}>
                            <FileTextOutlined />
                        </Col>
                        <Col span={3}>
                            <Checkbox />
                        </Col>
                        <Col span={3}>
                            <Checkbox />
                        </Col>
                        <Col span={3}>
                            <UpCircleOutlined />
                            <DownCircleOutlined />
                        </Col>
                    </Row>))}
                <Row className="option_footer">
                    <Col span={12} className="footer_left">
                        <span onClick={() => {
                            this.addOrDeleteOptions(this.state.options.length - 1, 'add');
                        }} >
                            <PlusSquareOutlined /><span>添加选项</span>
                        </span>

                    </Col>
                    <Col span={3}>说明</Col>
                    <Col span={3}>允许填空</Col>
                    <Col span={3}>默认</Col>
                    <Col span={3}>上移下移</Col>
                </Row>
            </div>
        )
    }
}

export default OptionOperation;
