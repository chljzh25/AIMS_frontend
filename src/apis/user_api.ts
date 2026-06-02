import request from '@/apis/request'
import { type User } from '@/stores/user'

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export function login(data: LoginData) {
  return request.post<LoginResponse>('/user/login', data)
}

export interface RegisterData {
  email: string
  invite_code: string
  username: string
  realname: string
  password: string
}

export interface ResponseSchema {
  result: 'success' | 'fail'
}

export function register(data: RegisterData) {
  return request.post<ResponseSchema>('/user/register', data)
}
