// 导入Pinia的状态管理库中的defineStore函数
import { defineStore } from 'pinia'

// 定义部门接口，包含ID和名称字段
export interface Department {
  id: string // 部门ID
  name: string // 部门名称
}

// 定义用户接口，包含用户的所有属性
export interface User {
  id: string // 用户唯一标识符
  username: string // 用户名
  email: string // 邮箱地址
  phone_number: string | null // 电话号码（可为空）
  realname: string // 真实姓名
  department: Department // 所属部门信息
  is_active: boolean // 是否激活状态
  is_superuser: boolean // 是否为超级管理员
  is_hr: boolean // 是否为HR人员
  created_at: string // 创建时间
  managed_departments?: Department[] // HR负责的部门列表
}

// 定义用户状态接口，包含用户信息和访问令牌
export interface UserState {
  user: User | null // 当前用户信息，可能为空
  accessToken: string | null // 访问令牌，可能为空
}

// 创建用户状态管理store，使用Pinia的defineStore定义
export const useUserStore = defineStore('user', {
  // 定义状态初始值
  state: (): UserState => {
    // 从浏览器localStorage中获取已保存的用户信息和访问令牌
    // 数据是存储在浏览器的localStorage中的，所以在初始化时需要从localStorage中读取数据
    const user = localStorage.getItem('user')
    const accessToken = localStorage.getItem('accessToken')
    return {
      // 如果localStorage中有用户信息则解析使用，否则设为null
      user: user ? JSON.parse(user) : null,
      // 如果localStorage中有访问令牌则使用，否则设为null
      accessToken: accessToken || null,
    }
  },

  // 定义计算属性(getters)
  getters: {
    // 检查用户是否已登录
    isLoggedIn(): boolean {
      return !!this.accessToken // 如果存在访问令牌则返回true，表示已登录
    },
    // 获取用户信息
    getUserInfo(): User | null {
      return this.user // 返回当前用户信息
    },
    // 获取访问令牌
    getAccessToken(): string | null {
      return this.accessToken // 返回访问令牌
    },
    // 检查用户是否为HR人员
    isHr(): boolean {
      return this.user?.is_hr || false // 如果用户存在且is_hr为true则返回true
    },
    // 检查用户是否为超级管理员
    isSuperUser(): boolean {
      return this.user?.is_superuser || false // 如果用户存在且is_superuser为true则返回true
    },
  },

  // 定义操作方法(actions)
  actions: {
    // 登录操作：保存用户信息和访问令牌到状态和本地存储
    login(user: User, accessToken: string) {
      this.user = user // 更新状态中的用户信息
      this.accessToken = accessToken // 更新状态中的访问令牌
      // 将用户信息和访问令牌保存到localStorage中
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('accessToken', accessToken)
    },
    // 登出操作：清除用户信息和访问令牌
    logout() {
      this.user = null // 清空状态中的用户信息
      this.accessToken = null // 清空状态中的访问令牌
      // 从localStorage中清除用户信息和访问令牌
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    },
  },
})
