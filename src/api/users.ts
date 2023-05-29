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
    }
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
});
export default api