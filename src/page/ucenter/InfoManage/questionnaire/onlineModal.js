import React from 'react';
import {Modal, Form, Radio, Input, Select} from "antd";
import {
    ExclamationCircleOutlined
} from '@ant-design/icons';

const OnlineModal = (props) => {
    const {onlineVisible, handleVisible, handleOk} = props;
    let formRef = React.createRef();

    return (
        <Modal
            className="online_modal"
            title={<span className="online_title">
                上线
                <ExclamationCircleOutlined/>
                <span className="online_right">上线后不支持修改，请慎重操作</span>
            </span>}
            visible={onlineVisible}
            onOk={() => {
                handleVisible('onlineVisible', false);
                handleOk('OnlineModal', formRef.current.getFieldsValue());
            }}
            onCancel={() => {
                handleVisible('onlineVisible', false);
                formRef.current.resetFields();
            }}
        >
            <Form
                labelCol={{span: 4,}}
                wrapperCol={{span: 14,}}
                layout="horizontal"
                ref={formRef}>
                <Form.Item label="填报范围" name="scope">
                    <Radio.Group>
                        <Radio value="small">门户网站</Radio>
                        <Radio value="middle">学校</Radio>
                        <Radio value="large">公开</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="学校" name="school">
                    <Select placeholder="请选择">
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="填报人" name="Informant">
                    <Input placeholder="1-20字符(如，校长，老师)"/>
                </Form.Item>
                <Form.Item label="备注" name="remark">
                    <Input.TextArea rows={4} placeholder="不超过200字符"/>
                </Form.Item>
            </Form>
        </Modal>
    )
};
export default OnlineModal;
