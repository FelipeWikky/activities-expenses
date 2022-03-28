import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { serialize } from "../utils/serialize";

export class APIService {
    public client: AxiosInstance | null = null;

    constructor(
        baseURL: string,
        private readonly endpoint: string,
    ) {
        this.client = axios.create({
            baseURL
        })
    }

    async get<T>(queriesObject?: object, config?: AxiosRequestConfig<T>) {
        const serialized = serialize(queriesObject);
        return this.client.get<T | T[] | undefined | null>(
            `/${this.endpoint}/${serialized}`,
            config
        )
    }

    async post<T>(body: T, config?: AxiosRequestConfig<T>) {
        return this.client.post(
            `/${this.endpoint}`,
            body,
            config
        )
    }
    async put<T>(param: string | number, body: T, config?: AxiosRequestConfig<T>) {
        return this.client.put(
            `/${this.endpoint}/${param}`,
            body,
            config
        )
    }
}