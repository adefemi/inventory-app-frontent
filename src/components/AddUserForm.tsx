import {Form, Input, Select, Button, notification} from "antd"
import Modal from "antd/lib/modal/Modal"
import {FC, useState} from "react"
import { axiosRequest } from "../utils/functions"
import { DataProps } from "../utils/types"
import { CreateUserUrl } from "../utils/network"

const {Option} = Select

interface AddUserFormProps {
    isVisible?: boolean
    onSuccessCallBack: () => void
    onClose: () => void
}

const AddUserForm:FC<AddUserFormProps> =  ({
    isVisible = false,
    onSuccessCallBack,
    onClose
}) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest({
            method:"post",
            url: CreateUserUrl,
            hasAuth: true,
            payload: values
        })
        setLoading(false)

        if(response){
            notification.success({
                message:"Operation Success",
                description: "User created successfully"
            })
            onSuccessCallBack()
            form.resetFields()
        }
    }

    return (
        <Modal 
            title="Add User" 
            visible={isVisible} 
            onCancel={onClose}
            footer={false}
            >
            <Form layout="vertical" onFinish={onSubmit} form={form}>
                <Form.Item 
                    label="Email"
                    name="email"
                    rules={[{ 
                        required: true, 
                        message: 'Please input your email!' }]}
                    >
                    <Input placeholder="Email" type="email" />
                </Form.Item>
                <Form.Item 
                    label="Name"
                    name="fullname"
                    rules={[{ 
                        required: true, 
                        message: 'Please input your name!' }]}
                    >
                    <Input placeholder="Name" type="text" />
                </Form.Item>
                <Form.Item 
                    label="Role"
                    name="role"
                    rules={[{ 
                        required: true, 
                        message: 'Please select a role!' }]}
                    >
                    <Select placeholder="Role">
                        <Option value="admin">Admin</Option>
                        <Option value="creator">Creator</Option>
                        <Option value="sale">Sale</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" block loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddUserForm