# Ghost

![GHOST](/src/icon.png)
Ghost 是一个本地的 LLM 对话应用，是参加 *MarsCode 寒假青训营* 的结营大项目。

| **团队成员** | **主要贡献**                                             |
| -------------------- | ---------------------------------------------------------------- |
| 我                     | 总体项目规划辅助小组完成特定任务                               |
| 方**             | 用户体验设计、视觉交互方案制定、UI 设计并跨平台兼容性优化      |
| 陈**             | 整体风格把控、原型图设计并制作了 Demo、为项目设计图标          |
| 韦**             | 前端样式页面实现（含多段适应的响应化设计、Tabbar、隐私模式等） |
| 陈**             | 交互逻辑实现、跨平台兼容性优化、优化用户体验设计               |
| 朱**             | 组件开发、大模型接口对接、数据存储设计、消息处理及流式响应实现 |

# 部署

本项目`main`分支同步部署在 CloudFlare Pages 的平台上。

1. 创建以下环境变量`.env`

```
VITE_DEFAULT_MODEL_ID=Qwen/Qwen2-1.5B-Instruct
VITE_API_BASE_URL=https://api.siliconflow.cn/v1
VITE_FALLBACK_API_KEY=sk-[YOUR_API_KEY]
```

2. `Clone` 本项目并部署

```shell
git clone https://github.com/mengxin10824/Ghost.git
npm run dev
```

# 致谢

* 感谢 CloudFlare 的免费服务
* 感谢我们 6 人小组的长期陪伴
* 感谢本项目使用了如下但不限于的项目：
  * Vue
  * Vitest
  * Vite
  * Markdown-It
  * Axios
  * TailwindCSS

