import axios from "axios";
import { API_TIMEOUT_MS, APIInstance } from "../../models/api";

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: API_TIMEOUT_MS
})

export class API {
  instance: APIInstance

  constructor(instance: APIInstance | null) {
    this.instance = instance || baseApi;
  }

  public post<T>(endpoint:string, body: Record<string, unknown>):Promise<T>{
    return this.instance.post(endpoint, body)
  }

  public get<T>(endpoint: string, params: string = "") : Promise<T> {
    return this.instance.get(`${endpoint}${params}`)
  }

  public put<T>(endpoint:string, body: Record<string, unknown>):Promise<T>{
    return this.instance.put(endpoint, body)
  }

  public delete<T>(endpoint:string):Promise<T>{
    return this.instance.delete(endpoint);  
  }
}