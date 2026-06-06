# HR 智能管理系统 — 前端

基于 Vue 3 + TypeScript 的 AI 智能人力资源管理平台前端应用，覆盖从职位发布到候选人入职的全流程招聘管理界面。

> 本仓库为前端代码（AIMS_frontend）。后端代码请前往 [AIMS](https://github.com/chljzh25/AIMS) 仓库。

## 技术栈

| 技术         | 版本 | 说明                     |
| ------------ | ---- | ------------------------ |
| Vue          | 3.5  | 前端框架                 |
| TypeScript   | 6.0  | 类型安全                 |
| Vite         | 8    | 构建工具                 |
| Pinia        | 3    | 状态管理                 |
| Vue Router   | 5    | 路由管理（History 模式） |
| Element Plus | 2.14 | UI 组件库                |
| Tailwind CSS | 4    | 原子化 CSS 框架          |
| ECharts      | 6    | 数据可视化图表           |
| Axios        | 1.16 | HTTP 客户端              |

## 项目结构

```
hr_frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── apis/                    # API 调用层
│   │   ├── request.ts           # Axios 封装（拦截器、JWT 注入）
│   │   ├── user_api.ts          # 用户认证、部门管理、钉钉集成
│   │   ├── position_api.ts      # 职位管理
│   │   ├── candidate_api.ts     # 候选人管理、简历上传、AI 评分
│   │   └── dashboard_api.ts     # 仪表盘统计
│   ├── components/
│   │   ├── AuthLayout.vue       # 登录/注册布局
│   │   └── MainLayout.vue       # 主后台布局（顶栏 + 侧栏 + 内容区）
│   ├── pages/
│   │   ├── login/               # 登录页
│   │   ├── register/            # 注册页
│   │   ├── dashboard/           # 仪表盘（近 7 天候选人趋势）
│   │   ├── positions/           # 职位管理列表
│   │   ├── candidates/          # 候选人列表 + 添加候选人
│   │   ├── employees/           # 员工管理
│   │   ├── hr-management/       # HR 管理
│   │   └── settings/            # 个人设置
│   ├── router/
│   │   └── index.ts             # 路由配置
│   ├── stores/
│   │   └── user.ts              # 用户状态（token + 用户信息）
│   ├── utils/
│   │   └── fullLoading.ts       # 全局加载指令
│   ├── App.vue                  # 根组件
│   ├── index.css                # Tailwind CSS 入口
│   └── main.ts                  # 应用入口
├── .env.development             # 开发环境变量
├── .env.production              # 生产环境变量
├── .prettierrc.json             # 代码格式化配置
├── index.html                   # HTML 入口
├── package.json                 # 依赖与脚本
├── tsconfig.json                # TypeScript 配置
└── vite.config.ts               # Vite 构建配置
```

## 页面与路由

| 路径              | 页面       | 说明                             |
| ----------------- | ---------- | -------------------------------- |
| `/login`          | 登录页     | 邮箱 + 密码登录                  |
| `/register`       | 注册页     | 邀请码注册                       |
| `/dashboard`      | 仪表盘     | 近 7 天候选人新增趋势（ECharts） |
| `/positions`      | 职位管理   | 职位列表、创建、删除             |
| `/candidates`     | 候选人列表 | 状态筛选、AI 评分查看            |
| `/candidates/add` | 添加候选人 | 上传简历 → 关联职位 → 创建       |
| `/employees`      | 员工管理   | 员工列表、状态管理               |
| `/hr-management`  | HR 管理    | 邀请用户、分配部门               |
| `/settings`       | 个人设置   | 个人信息维护                     |

除 `/login` 和 `/register` 外，所有页面共用 `MainLayout` 布局（顶部导航 + 左侧菜单 + 右侧内容区）。

## 安装与运行

**前置要求**: Node.js `^20.19.0` 或 `>=22.12.0`

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev
# 默认运行在 http://localhost:5173
# API 请求自动指向 http://127.0.0.1:8000（见 .env.development）

# 3. 类型检查
npm run type-check

# 4. 格式化代码
npm run format

# 5. 生产构建
npm run build
# 构建产物输出到 dist/ 目录
```

## 环境变量

| 文件               | `VITE_API_BASE_URL`          | 说明           |
| ------------------ | ---------------------------- | -------------- |
| `.env.development` | `http://127.0.0.1:8000`      | 本地后端       |
| `.env.production`  | `http://118.195.207.201/api` | 腾讯云生产环境 |

## 认证

采用 JWT Bearer Token 认证：

- 登录成功后 token 存储在 `localStorage` 中
- 所有 API 请求自动通过 Axios 拦截器添加 `Authorization: Bearer <token>` 请求头
- 登出时清空 localStorage 中的 token 和用户信息

## 部署环境

项目已部署到**腾讯云**服务器（`118.195.207.201`），前端静态资源通过 Nginx 提供服务，API 请求通过反向代理转发到后端 FastAPI 服务。

## 后端仓库

后端代码托管在 [AIMS](https://github.com/chljzh25/AIMS)，包含完整的技术文档和 API 接口文档。
