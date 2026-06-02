<template>
  <!-- 使用 AuthLayout 布局组件，设置标题为"江苏哈哈哈哈智能招聘系统"，副标题为"登录您的账户" -->
  <AuthLayout title="江苏哈哈哈哈智能招聘系统" subtitle="登录您的账户">
    <!-- Element Plus 表单组件，绑定数据模型和验证规则 -->
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      class="space-y-6"
      @submit.prevent="submitForm(ruleFormRef)"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" size="large" placeholder="请输入邮箱地址" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          size="large"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>

      <div>
        <el-button type="primary" native-type="submit" class="w-full" size="large">登录</el-button>
      </div>
    </el-form>

    <p class="mt-10 text-center text-sm text-gray-500">
      还没有账户?
      {{ ' ' }}
      <router-link
        to="/register"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >立即注册</router-link
      >
    </p>
  </AuthLayout>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus' // Element Plus 类型定义
import { ElMessage } from 'element-plus' // Element Plus 消息组件
import { useRouter } from 'vue-router' // Vue Router 的路由控制
import AuthLayout from '@/components/AuthLayout.vue' // 自定义认证布局组件

const router = useRouter() // 获取路由器实例
const ruleFormRef = ref<FormInstance>() // 表单引用，用于访问表单实例

// 表单数据模型，包含邮箱和密码字段
const ruleForm = reactive({
  email: '',
  password: '',
})

// 表单验证规则
const rules = reactive<FormRules<typeof ruleForm>>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' }, // 必填验证
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }, // 邮箱格式验证
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }, // 必填验证
    { min: 6, max: 20, message: '密码长度应为 6 到 20 个字符', trigger: 'blur' }, // 长度验证
  ],
})

// 表单提交处理函数
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return // 如果表单实例不存在则返回
  // 验证表单
  await formEl.validate(async (valid) => {})
}
</script>
