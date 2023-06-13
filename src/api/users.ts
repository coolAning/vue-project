import { APISchema } from '@/api/type'
import { attachAPI, service } from "@/api/request";

interface TestAPISchema extends APISchema {
    login: {
        request: {
            "account": string,
            "password": string
        },
        response: {
            "uuid": string
            "account": string
        },
    },
    getUsers: {
        request: {
        },
        response: {
            "uuid": string
            "account": string
        }[],
    },
    add: {
        request: {
            "uuids": string[],
        },
        response: {
        },
    },
    getInfo: {
        request: {
        },
        response: {
            "data": {
                // "guuid": string,
                "num": number,
                "useruuid": string
            }[],
            "guuid": string,
            "txuuid"?: string,
            "next": string,
        }[],
    },
    getConfirm:{
        request: {
        },
        response: {
            "count": number,
            "guuid": string,
            "time": string,
            "txuuid": string,
            "useruuid": string
        }[],
    },
    addTx:{
        request: {
            "guuid": string,
        },
        response: string,
    },
    confirm:{
        request: {
            "txuuid" : string
        },
        response: {
        },
    },
    getConfirmState:{
        request: {
            "txuuid" : string
        },
        response: string[],
    },
    cancel:{
        request: {
            "txuuid" : string
        },
        response: {
        },
    },
}
export const api = attachAPI<TestAPISchema>(service, {
    login: {
        method : 'POST',
        url : '/login',
        needId : false,
    },
    getUsers:{
        method : 'GET',
        url : '/getUsers',
        needId : true,
    },
    add:{
        method : 'POST',
        url : '/add',
        needId : true,
    },
    getInfo:{
        method : 'GET',
        url : '/getInfo',
        needId : true,
    },
    getConfirm:{
        method : 'GET',
        url : '/getConfirm',
        needId : true,
    },
    addTx:{
        method : 'POST',
        url : '/addTx',
        needId : true,
    },
    confirm:{
        method : 'POST',
        url : '/confirm',
        needId : true,
    },
    getConfirmState:{
        method : 'POST',
        url : '/getConfirmState',
        needId : true,
    },
    cancel:{
        method : 'POST',
        url : '/cancel',
        needId : true,
    },
});
export type test = {
    [Key in keyof TestAPISchema] : TestAPISchema[Key]['response']
}
export default api