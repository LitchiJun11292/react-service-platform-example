import React from 'react';
import {Modal, Form, Button} from "antd";

const LinksModal = (props) => {
    const {linksVisible, handleVisible, handleOk} = props;
    let formRef = React.createRef();

    return (
        <Modal
            className="links_modal"
            title="生成外链"
            visible={linksVisible}
            onOk={() => {
                handleVisible('linksVisible', false);
                handleOk('OnlineModal', formRef.current.getFieldsValue());
            }}
            onCancel={() => {
                handleVisible('linksVisible', false);
                formRef.current.resetFields();
            }}
        >
            <Form
                labelCol={{span: 3,}}
                layout="horizontal"
                ref={formRef}>
                <Form.Item label="二维码" name="QR_code">
                    <img src={require('@/statics/images/defaultImage.png')} alt="" width="300" height="200"/>
                </Form.Item>
                <Form.Item label="链接" name="link">
                    <div className="links_copy">
                        <div>https://www.jooc.com/uccode?uncodie=111</div>
                        <Button type="primary" size="small">一键复制</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
};
export default LinksModal;
