import { AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/** 去除可索引签名 */
type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [Key in keyof Obj as Key extends `${infer Str}` ? Str : never]: Obj[Key];
};



export type APIurl = {
    method : string,
    url : string,
    needId : boolean,
};

export type HeaderHandler = (config?: AxiosRequestConfig) => Promise<AxiosRequestHeaders>;
export type RequestErrorHandler = (error: AxiosError) => void;

export type APISchema = Record<string, {
    request: Record<string, any> | void;
    response: Record<string, any> | any;
}>;

export type CreateRequestConfig<T extends APISchema> = {
    baseURL: string;
    headers?: AxiosRequestHeaders;
    headerHandlers?: Array<HeaderHandler>;
    errorHandler?: RequestErrorHandler;
    apis: {
        [K in keyof RemoveIndexSignature<T>]: APIurl;
    };
};
type RequestFunction<P = Record<string, any> | void, R = any> = (
    params: P, id?:string
) => Promise<R>;
// 创建请求客户端的类型约束
export type CreateRequestClient<T extends APISchema> = {
    [K in keyof RemoveIndexSignature<T>]: RequestFunction<
        RemoveIndexSignature<T>[K]['request'],
        AxiosResponse<RemoveIndexSignature<T>[K]['response']>
    >;
};