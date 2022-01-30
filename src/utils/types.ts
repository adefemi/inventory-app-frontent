import { AxiosError } from "axios";
import React from "react";

export interface DataProps {
    [key: string]: string | boolean | number | DataProps | React.ReactElement | DataProps[] | null
}

export interface invoiceCreationAddRemoveProps {
    [key: number]: number
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
    response?: {
        data: {
            error: string
        }
    }
}

export interface AuthTokenType {
    Authorization: string
}

export interface UserType {
    email: string
    fullname: string
    id: string
    created_at: string
    role: string
    last_login: string
}

export interface AuthProps {
    errorCallBack?: () => void,
    successCallBack?: () => void,
}

export interface StoreProps {
    user: UserType | null
    updatePasswordUserId: number | null
}

export enum ActionTypes {
    UPDATE_USER_INFO = "[action] update user info",
    UPDATE_PASSWORD_USER_ID = "[action] update password user id"
}

export type ActionProps = {
    type: ActionTypes.UPDATE_USER_INFO,
    payload: UserType | null
} | {
    type: ActionTypes.UPDATE_PASSWORD_USER_ID,
    payload: number | null
}

export interface StoreProviderProps {
    state: StoreProps,
    dispatch: (arg:ActionProps) => void
}

export interface FormModalProps {
    isVisible?: boolean
    onSuccessCallBack: (data?:number) => void
    onClose: () => void
}

export interface GroupProps {
    id: number
    name: string
    belongs_to: {
        name: string
        id: number
    } | null
    created_at: string
    total_items: number
}

export interface InventoryProps {
    id: number
    code: string
    name: string
    created_by:{
        email: string
    }
    group: {
        name: string
        id: number
    }
    created_at: string
    remaining: number
    price: number
    photo: string
    total?: number
}

export interface InvoiceCreationProps {
    id: number
    item: string
    qty: number
    price: number
    total: number
    action?: React.ReactElement
}

export interface ShopProps {
    created_at: string
    name: string
    created_by: DataProps 
    created_by_email?: string
    id: number
}

export interface invoiceType {
    id: number
    created_at: string
    created_by_email: string
    invoice_items: InvoiceCreationProps[]
    shop_name: string
}