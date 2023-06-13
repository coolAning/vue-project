
import axios, { AxiosInstance, AxiosRequestHeaders, AxiosError } from 'axios';
import {
    APISchema,
    CreateRequestConfig,
    CreateRequestClient,
    APIurl,
} from './type';

export function attachAPI<T extends APISchema>(
    client: AxiosInstance,
    apis: CreateRequestConfig<T>['apis'],
): CreateRequestClient<T> {
    const hostApi: CreateRequestClient<T> = Object.create(null);
    for (const apiName in apis) {
        const apiConfig = apis[apiName];
        let apiPath = apiConfig as APIurl;

        hostApi[apiName] = (params, id) => {
            const _params = { ...(params || {}) };
            let url = ""
            if(apiPath.needId){
                url = `/${id}${apiPath.url}`
            } else{
                url = apiPath.url
            }
            console.log(url)
            return client.request({
                url,
                method: apiPath.method,
                data: params,
            });
        };
    }
    return hostApi;
}
import { ElMessage } from "element-plus";
export const service = axios.create({
    baseURL: "https://tro.435qb.top:13456",//"https://tro.435qb.top:13456", //"http://118.202.10.57:13456" "http://localhost:8085"
    timeout: 5000,
})

service.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
}, error => {
    return Promise.reject(new Error(error))
})

service.interceptors.response.use((response) => {

    const meta = response.data
    if (meta.status === 0) {
        // ElMessage.success(meta.message);
        response.data = meta.result
        return response
    } else {
        ElMessage.error(meta.message)
        return Promise.reject(new Error(meta.message))
    }
}, error => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error((error.response.data)))
})

export default service