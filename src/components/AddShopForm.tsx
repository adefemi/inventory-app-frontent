import {Form, Input, Button, notification} from "antd"
import Modal from "antd/lib/modal/Modal"
import {FC, useState} from "react"
import { axiosRequest } from "../utils/functions"
import { DataProps, FormModalProps } from "../utils/types"
import { ShopUrl } from "../utils/network"

const AddShopForm:FC<FormModalProps> =  ({
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
            url: ShopUrl,
            hasAuth: true,
            payload: values
        })
        setLoading(false)

        if(response){
            notification.success({
                message:"Operation Success",
                description: "Shop added successfully"
            })
            onSuccessCallBack()
            form.resetFields()
        }
    }

    return (
        <Modal 
            title="Add Shop" 
            visible={isVisible} 
            onCancel={onClose}
            footer={false}
            >
            <Form layout="vertical" onFinish={onSubmit} form={form}>
                <Form.Item 
                    label="Name"
                    name="name"
                    rules={[{ 
                        required: true, 
                        message: 'Please enter a shop name!' }]}
                    >
                    <Input placeholder="Name" type="text" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" block loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddShopForm