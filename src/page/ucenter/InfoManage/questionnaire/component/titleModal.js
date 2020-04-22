import React from 'react';
import {Modal, Form, Radio, Input, Select} from "antd";

const TitleModal = (props) => {
    const {titleVisible, handleVisible, handleOk, question} = props;
    let formRef = React.createRef();

    return (
        <Modal
            className="title_modal"
            title="修改标题"
            visible={titleVisible}
            onOk={() => {
                handleVisible('titleVisible', false);
                handleOk('question', formRef.current.getFieldsValue());
            }}
            onCancel={() => {
                handleVisible('titleVisible', false);
                formRef.current.resetFields();
            }}
        >
            <Form
                labelCol={{span: 4,}}
                wrapperCol={{span: 14,}}
                layout="horizontal"
                initialValues={{...question}}
                ref={formRef}>
                <Form.Item label="问卷标题" name="title">
                    <Input placeholder="请输入问卷标题"/>
                </Form.Item>
                <Form.Item label="问卷说明" name="decr">
                    <Input.TextArea rows={4} placeholder="请输入问卷说明"/>
                </Form.Item>
            </Form>
        </Modal>
    )
};
export default TitleModal;
