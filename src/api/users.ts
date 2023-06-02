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
            "next": string,
        }[],
    },
    getConfirm:{
        request: {
        },
        response: {
        },
    },
    addTx:{
        request: {
            "guuid": string,
        },
        response: {
        },
    },
    confirm:{
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
        method : 'GET',
        url : '/addTx',
        needId : true,
    },
    confirm:{
        method : 'POST',
        url : '/confirm',
        needId : true,
    },
});
export default api