import React, { useEffect, useRef } from 'react';
import { Form, Input, Modal, message } from 'antd';
import ElectionBridge from '../../bridge';

const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]);
};

export const RegisterForm = ({ visible, onCancel, handleRegisterOk }) => {
    const [form] = Form.useForm();
    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onOk = () => {
        form.submit();
    };

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const onFinish = values => {
        visible = false;
        let electionBridge = new ElectionBridge();
        electionBridge.addCandidate(values.name, values.qualification).then(res => {
            console.log(res);
            message.success("Candidate added successfully");
            handleRegisterOk();
        }).catch(err => {
            console.log(err)
            message.error("Unable to add candidate");
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title="Register as a candidate" visible={visible} onOk={onOk} onCancel={onCancel}>
            <Form
                form={form}
                {...layout}
                name="register"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Qualification"
                    name="qualification"
                    rules={[{ required: true, message: 'Please input your qualification!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};