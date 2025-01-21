import axios from "axios";
import { API_TIMEOUT_MS, APIInstance } from "../../models/api";

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  withCredentials: true,
});

export class API {
  instance: APIInstance;

  constructor(instance: APIInstance | null) {
    this.instance = instance || baseApi;
  }

  public post<Body, Output>(endpoint: string, body: Body): Promise<Output> {
    return this.instance.post(endpoint, body);
  }

  public get<T>(endpoint: string, params: string = ""): Promise<T> {
    return this.instance.get(`${endpoint}${params}`);
  }

  public put<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
    return this.instance.put(endpoint, body);
  }

  public patch<U, T>(endpoint: string, body: U): Promise<T> {
    return this.instance.patch(endpoint, body);
  }

  public delete<T>(endpoint: string, params: string = ""): Promise<T> {
    return this.instance.delete(`${endpoint}?${params}`);
  }
}
