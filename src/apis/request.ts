// 导入 axios 库及其类型定义
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
// 导入用户状态管理 store
import { useUserStore } from '@/stores/user'
// 定义一个 HTTP 请求类
class HttpRequest {
  // 私有属性：axios 实例
  private instance: AxiosInstance
  // 公共属性：API 基础 URL
  public baseURL: string

  // 构造函数
  constructor() {
    // TODO: Add your API base URL here
    // 获取环境变量中的 API 基础 URL
    const baseURL = import.meta.env.VITE_API_BASE_URL
    this.baseURL = baseURL

    // 创建 axios 实例，配置基础 URL 和超时时间（300秒）
    this.instance = axios.create({
      baseURL,
      timeout: 300000,
    })

    // 初始化请求和响应拦截器
    this.initializeInterceptors()
  }

  // 私有方法：初始化请求和响应拦截器
  private initializeInterceptors() {
    // Request interceptor
    // 请求拦截器：在发送请求前处理一些逻辑
    this.instance.interceptors.request.use(
      (config) => {
        // 获取用户状态管理实例
        const userStore = useUserStore()
        // 获取访问令牌
        const token = userStore.accessToken
        console.log('token：', token)
        // 如果存在令牌，则添加到请求头中
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        // 请求错误时的处理
        return Promise.reject(error)
      },
    )

    // Response interceptor
    // 响应拦截器：处理服务器返回的数据
    this.instance.interceptors.response.use(
      (response) => {
        // 直接返回响应数据部分
        return response.data
      },
      (error) => {
        // TODO: Add global error handling
        // TODO: 添加全局错误处理
        return Promise.reject(error)
      },
    )
  }

  // 通用请求方法
  public request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>(config)
  }

  // GET 请求方法
  public get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: 'GET', params })
  }

  // POST 请求方法
  public post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: 'POST', data })
  }

  // PUT 请求方法
  public put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: 'PUT', data })
  }

  // DELETE 请求方法
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: 'DELETE' })
  }

  // PATCH 请求方法
  public patch<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: 'PATCH', data })
  }

  // 上传文件方法
  public upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      url,
      method: 'POST',
      data: formData,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data', // 设置为表单数据格式
      },
    })
  }
}

// 导出该类的单例实例
export default new HttpRequest()
