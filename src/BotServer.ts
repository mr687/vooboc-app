import axios, { AxiosInstance } from "axios"
import Env from "./Env"

export default class BotServer {
    private readonly baseUrl = 'https://api.idcloudhost.com/v1'
    private readonly region = 'jkt01'
    private readonly request: AxiosInstance;

    public constructor() {
        this.request = axios.create({
            baseURL: this.baseUrl,
            headers: this.getHeaders,
        })
    }

    public async getVmList() {
        const response = await this.request.get(`/${this.region}/user-resource/vm/list`)
        return response.data
    }

    public async getVm(id: string) {
        const response = await this.request.get(`/${this.region}/user-resource/vm?uuid=${id}`)
        return response.data
    }

    public async stopVm(id: string) {
        const response = await this.request.post(`/${this.region}/user-resource/vm/stop`, {
            uuid: id,
            force: false
        })
        return response.data
    }

    public async startVm(id: string) {
        const response = await this.request.post(`/${this.region}/user-resource/vm/start`, {
            uuid: id
        })
        return response.data
    }

    private get getHeaders() {
        return {
            'apikey': Env.idCloudhost.apiKey as string,
            'Content-Type': 'application/json'
        }
    }
}