# Airtable CMS 配置指南

## 1. 创建 Airtable Base 和表格

### 1.1 在 Airtable 中创建新 Base

前往 [airtable.com](https://airtable.com/) 创建一个新 Base，命名为"皖美的她"。

---

## 2. 创建两张表

### 表一：Products（作品表）

| 字段名（中文） | 字段类型 | 说明 |
|---|---|---|
| 作品名称 | Single line text | 产品的标题，如"点翠凤凰发簪" |
| 主图链接 | URL | 产品的封面主图（建议 600x600 以上） |
| 详情图链接 | Long text | 多个图片链接，换行或逗号分隔（第一张必填） |
| 所属分类 | Single select | 选项：点翠、刺绣、绒花、木雕、编织、陶瓷等 |
| 制作人 | Single line text | 制作者姓名，如"李阿姨" |
| 所属地区 | Single line text | 如"安徽·黄山" |
| 介绍 | Long text | 产品描述文案 |
| 标签 | Single line text | 逗号分隔，如"纯手工,非遗,香包" |
| 价格 | Single line text | 如"¥1,280" |
| 背后故事 | Long text | 关于这件作品背后的小故事或手艺人引言 |

### 表二：Stories（风采表）

| 字段名（中文） | 字段类型 | 说明 |
|---|---|---|
| 姓名 | Single line text | 手艺人的姓名 |
| 年龄 | Number (integer) | 年龄 |
| 头像链接 | URL | 个人头像图片链接 |
| 封面链接 | URL | 大图封面 |
| 所属地区 | Single line text | 如"安徽·黄山" |
| 手艺 | Single line text | 如"点翠"、"刺绣" |
| 从艺年数 | Number (integer) | 从业年数 |
| 简介 | Long text | 简短自我介绍（前60字用作卡片预览） |
| 详细故事 | Long text | 完整的故事文案 |
| 金句 | Long text | 一句代表性的话 |
| 作品名称 | Long text | 关联的作品名，逗号或换行分隔（需与 Products 表中"作品名称"一致） |
| 点赞数 | Number (integer) | 初始点赞数 |

---

## 3. 获取 API 密钥

### 3.1 创建 Personal Access Token

1. 前往 https://airtable.com/create/tokens
2. 点击 **Create new token**
3. 命名（如"皖美的她 H5"）
4. **Scopes** 勾选：
   - `data.records:read`
5. 点击 **Create token**，复制生成的 token（格式：`patXXXXXXXXXXXXXX`）

### 3.2 获取 Base ID

1. 回到你的 Airtable Base 页面
2. 点击右上角 **Help** → **API documentation**
3. 在文档页面顶部即可看到你的 **Base ID**（格式：`appXXXXXXXXXXXXXX`）

---

## 4. 配置项目

1. 将项目根目录下的 `.env.example` 复制为 `.env`
2. 填入你的 Base ID 和 Token：

```
VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
VITE_AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
```

**安全说明**：Token 只有 `data.records:read` 只读权限，即使暴露在前端代码中也无法修改数据。管理员始终通过 Airtable 网页端操作数据。

---

## 5. 启动和部署

```bash
# 开发
npm install
npm run dev

# 构建生产版本
npm run build
# 产物在 dist/ 文件夹，可直接部署到任何静态托管服务
```

---

## 6. 管理员操作流程

1. 打开 Airtable，进入你的 Base
2. **新增作品**：在 Products 表中添加一行，填写所有字段
3. **修改作品**：直接在表格中编辑对应行的字段
4. **删除作品**：删除对应行
5. **新增/编辑手艺人**：在 Stories 表中操作

**生效方式**：用户每次打开或刷新 H5 页面时，前端会重新拉取 Airtable 数据。无需重新部署。

---

## 7. 重要提示

- **"作品名称"是关联键**：Stories 表的"作品名称"字段中的值，必须与 Products 表中对应作品的"作品名称"完全一致，否则风采页无法显示关联作品。
- **图片托管**：Airtable 不存储图片文件，只存储链接。请先将图片上传到图床（如 SM.MS、阿里云 OSS、Cloudinary 等），再把链接填入 Airtable。
- **不配置 API 也能运行**：如果 `.env` 中未配置 Airtable，项目会自动使用内置的静态示例数据，方便本地开发预览。
