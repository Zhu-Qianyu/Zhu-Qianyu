# Zhu Qianyu · 个人主页

跨学科技术实践者的个人网站，与 GitHub 个人资料仓库 [Zhu-Qianyu/Zhu-Qianyu](https://github.com/Zhu-Qianyu/Zhu-Qianyu) 关联。

- **在线预览**（部署后）：`https://zhu-qianyu.github.io/Zhu-Qianyu/`
- **GitHub 主页**：[@Zhu-Qianyu](https://github.com/Zhu-Qianyu)

## 技术栈

Vue 3 · Vite · GitHub Pages

## 本地开发

```bash
npm install
npm run dev
```

浏览器打开终端提示的地址（默认 `http://localhost:5173`）。

## 构建与部署

```bash
npm run build
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

首次启用 Pages：

1. 仓库 **Settings → Pages**
2. **Build and deployment** 选择 **GitHub Actions**

## 自定义内容

编辑 `src/data/profile.js` 可更新姓名、简介、项目、邮箱等，无需改组件代码。

## 仓库结构

| 路径 | 说明 |
|------|------|
| `src/App.vue` | 页面布局与区块 |
| `src/data/profile.js` | 个人资料数据 |
| `.github/workflows/deploy.yml` | Pages 自动部署 |

---

👋 Hello, I'm **Zhu Qianyu**

机电设备 · 深度学习 · 遥感算法 · 创业实践
