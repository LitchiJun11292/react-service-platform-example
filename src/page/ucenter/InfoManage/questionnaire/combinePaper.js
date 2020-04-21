import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button, Form, Input, Select, DatePicker} from 'antd';
import './index.scss';

const {Option} = Select;
const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

class AddQuestion extends React.Component {

    formRef = React.createRef();

    onGenderChange = value => {
        this.formRef.current.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };

    onFinish = values => {
        console.log(values);
    };

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    componentDidMount () {
        console.log(this.props);
    }

    render () {
        return (
            <div className="add_question">
                <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                    <Form.Item name="questionnaire_name" label="问卷名称" rules={[{required: true, message: '请输入问卷名称'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="questionnaire_desc" label="问卷描述">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="theme" label="主题">
                        <Input/>
                    </Form.Item>
                    <Form.Item name="sponsor" label="发起单位">
                        <Input/>
                    </Form.Item>
                    <Form.Item className="add_question_item"
                               label="调查日期" style={{marginBottom: 0}}>
                        <Form.Item name="survey_start" className="add_question_item_co">
                            <DatePicker/>
                        </Form.Item>
                        <span className="add_question_item_span">~</span>
                        <Form.Item name="survey_end" className="add_question_item_co" colon={false}>
                            <DatePicker/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item name="type" label="类型" rules={[{required: true, message: '请选择类型'}]}>
                        <Select
                            placeholder="请选择类型"
                            onChange={this.onGenderChange}
                            allowClear
                        >
                            <Option value="0">匿名</Option>
                            <Option value="1">实名</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                        <Button htmlType="button"
                                style={{margin: '0 10px'}}
                                onClick={this.onReset}>
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(AddQuestion));
