import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import './index.scss';

const { Option } = Select;

class BaseForm extends React.Component {

    initFormList = () => {
        const formList = this.props.formList;
        return formList.map(item => {
            const { type, width, label, field, placeholder } = item;
            switch (type) {
                case 'INPUT':
                    return (<Form.Item
                        key={field}
                        label={label}
                        name={field}>
                        <Input style={{ width: width }} placeholder={placeholder} />
                    </Form.Item>);
                case 'SELECT':
                    return (<Form.Item
                        key={field}
                        label={label}
                        name={field}>
                        <Select style={{ width: width }}
                            placeholder={placeholder}
                            allowClear>
                            {item.list.map(it =>
                                (<Option key={it.id} value={it.id}>{it.name}</Option>))}
                        </Select>
                    </Form.Item>);
                case 'DatePickers':
                    const dateFormat = 'YYYY/MM/DD';
                    const times = [
                        <Form.Item
                            key={field[0]}
                            label={label}
                            name={field[0]}>
                            <DatePicker
                                placeholder={placeholder[0]}
                                format={dateFormat} />
                        </Form.Item>,
                        <Form.Item
                            label="~"
                            key={item.field[1]}
                            colon={false}
                            name={item.field[1]}>
                            <DatePicker
                                placeholder={placeholder[1]}
                                format={dateFormat} />
                        </Form.Item>
                    ];
                    return times;
            }
        })
    };

    render() {
        const onFinish = values => {
            console.log('Success:', values);
            console.log(values['start_time'].format());
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        const { formDate } = this.props;
        return (
            <Form
                className="baseForm"
                name="basic"
                layout="inline"
                initialValues={{
                    remember: true,
                    ...formDate
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {this.initFormList()}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapState = (state) => ({
    target: state.users.target
});

export default connect(mapState, null)(withRouter(BaseForm));
