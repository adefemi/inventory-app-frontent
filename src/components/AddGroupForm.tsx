import {Form, Input, Select, Button, notification} from "antd"
import Modal from "antd/lib/modal/Modal"
import {FC, useState} from "react"
import { axiosRequest } from "../utils/functions"
import { DataProps, FormModalProps, GroupProps } from "../utils/types"
import { GroupUrl } from "../utils/network"

const {Option} = Select

interface AddGroupFormProps extends FormModalProps {
    groups:GroupProps[]
}

const AddGroupForm:FC<AddGroupFormProps> =  ({
    isVisible = false,
    onSuccessCallBack,
    onClose,
    groups
}) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest({
            method:"post",
            url: GroupUrl,
            hasAuth: true,
            payload: values
        })
        setLoading(false)

        if(response){
            notification.success({
                message:"Operation Success",
                description: "Group created successfully"
            })
            onSuccessCallBack()
            form.resetFields()
        }
    }

    return (
        <Modal 
            title="Add Group" 
            visible={isVisible} 
            onCancel={onClose}
            footer={false}
            maskClosable={false}
            >
            <Form layout="vertical" onFinish={onSubmit} form={form}>
                <Form.Item 
                    label="Name"
                    name="name"
                    rules={[{ 
                        required: true, 
                        message: 'Please input group name!' }]}
                    >
                    <Input placeholder="Group name"/>
                </Form.Item>
                <Form.Item 
                    label="Belongs To"
                    name="belongs_to_id"
                    >
                    <Select defaultValue="">
                        <Option value="">Select a group</Option>
                        {
                            groups.map(
                                (item, index) => 
                                <Option value={item.id} key={index}>{item.name}</Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" block loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddGroupForm