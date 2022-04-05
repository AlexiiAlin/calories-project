import AxiosRequest from './axios-base';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

class HttpRequest {
  baseRequest: AxiosInstance;
  constructor() {
    this.baseRequest = AxiosRequest;
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return this.baseRequest.get(url, config);
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    return this.baseRequest.delete(url, config);
  }

  async post(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.baseRequest.post(url, data, config);
  }

  async put(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.baseRequest.put(url, data, config);
  }

  async patch(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.baseRequest.patch(url, data, config);
  }
}

const http = new HttpRequest();

export {http};
