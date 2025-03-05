# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).



# marscode

Marscode LLM 前段组件库

# Run

cd llm-project
npm run dev

> 豆包MarsCode 青训营-寒假专场：https://juejin.cn/post/7437020309973155849

## 背景

当前，与大模型的交互多种多样，但最常见也是最容易被用户理解的，就是对话框模式，例如：

- ChatGPT

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=YzI1NTEyNDQ1ODJmZTZmNzM4NjNiNjJkYmZmMzkzNjJfRGRpUjljNnpPanZpUW1xZWVvYm5vWVJ1RUJndG5RbXBfVG9rZW46UnM4WWJxbGdDb3BuSzB4N1NOR2NwcDA2bkdjXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=YzVkMTBlN2VlYmE0NTgzNmNjYzM5Mzg5NjZjYjZjMWZfODF0STZGbUFKcnRMeDRia0FOaUJqbHZnVTBjWkdwSnZfVG9rZW46Qms3TWJ3amQ4b05HTEt4TXR5VWNma0ZwbnVmXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=OGYxNzA1ZGVmNjcwM2Y3YWFhOThkYWMxOGRiOGVlOGVfanNLTnFSUmIwcEdjaVNJYjg2VWtDcVZaWFhudnVnR3pfVG9rZW46SDlaRGJHWElnb3plaEt4RUpFRGN0eTk2bldmXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

- Claude

- Coze

这种模式下，用户可以通过发送文本、图片、PDF等多种形式的输入，LLM则会根据接收到的信息进行处理并返回相应的结果。为此，需要在前端页面设计和实现支持多种输入输出形式的对话框组件，该组件不仅要能够接收和展示文本信息，还需具备处理和显示图片、文档等多媒体内容等能力，以便为用户提供更加直观和便捷的交互体验。

毫不夸张的说，几乎所有 LLM 产品都会提供这类交互组件，因此非常值得学习借鉴。

## 需求

1. ### 组件能力

组件样式可自行设计，此处以 claude 为例，介绍关键特性：

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=NWIxYmY2M2JkYjU5MjA4YzU0ZmI4MTFiNzM1ZDViMjJfZXBaYWI1bFhhZUNCeFZmdUZPQUM3eE9OZFJDNm5WeTlfVG9rZW46T05CbmJHZDFOb2hYUjJ4RzJmM2M4OTdsbjdzXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

- 需要支持用户输入对话，且对话内容支持图片、PDF 等多媒体格式；
- 用户输入对话并回车后，调用 LLM 接口，组件内流式展示大模型返回的结果；
- LLM 返回内容可能为：文本、Markdown、图片等，需要正确展示这些格式内容；
- **需要支持LLM 流式返回结果，实现逐行打印效果；**
- **若返回结果包含代码，请提供“Copy” 按钮，方便用户复制代码，样式如：**
    - ![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=NTkzMTI4MDg5MmJjNDNhMmNmNDdkZjJmNDg3NzgyMDVfV3MzZlU2SzhWRENBcmxYendKWUJDcks0MWNZelEwVHZfVG9rZW46SE82MmJLaU1nb2dqeEp4ejVrSWN2Wkxsbm5kXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

在此基础上，希望该组件支持内联与独立对话两种功能模式。

1. ### 内联对话框

参考 [Vercel 文档站](https://vercel.com/docs)，期望该对话组件支持内联模式，该模式下存在三种状态：

- 收缩形态：表现为一个单一的输入框，点击后展开弹框进入第二形态
    - ![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=OGM1ZTQ1ZGJlMTkxNGExNTZmZTEyOTMzN2EwMDZjYmVfUURiS3k3UFVXOE04ZU5WR1hKWk5ldFNweTIxNFRUb2xfVG9rZW46SGp4Q2JxZXdQbzBCYlp4RWh0dmN0ZFQ1bmxlXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)
- 展开形态：表现为支持对话的弹框模式，形如：
    - ![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=ZDM3MjM1YTc0ODk1NDI2NmFiOWViMmQyMDQ1MDZjNGVfdmdiMlhwU3BlT0lUakMxTGs2M0dmQ3FYZnAxcEV0VmlfVG9rZW46QkVzQWJ5WnJOb2M1enJ4U1M0QmNqa0xHblRnXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)
- 对话形态：用户输入问题后，立即进入该形态，形态上既为 LLM 对话信息流，如：

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=NTQ4ZGQ2NzUxMzk2MWJmN2M0ZjFlNWFhY2UxNjAxYWRfU2dPS013NFB6bkJOWENWQ1U5Vk8xREJaUVFrZ09NMHdfVG9rZW46S0Y3R2J4WGFob0U1NmF4VzlCSmNkSEVSbnBnXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

注意，对话形态下需要支持 markdown、图片等格式。

1. ### 独立对话框

独立对话框模式下，页面主体内容为该对话框，对话内容平铺在页面上，大致样式如下：

![img](https://bytedance.larkoffice.com/space/api/box/stream/download/asynccode/?code=MjEyYWFmMjVkZWMxM2EyZTAyODhkNDNhNGM0MDJlNGNfS2FHNEdkcm5nV0pXVWU3eE9Gc0NWN3Zvdm41NlVMTHFfVG9rZW46TzA0emJNcFNlb2M3VTd4Y2syd2N3ZlZXbnVlXzE3MzY5NTYzNzI6MTczNjk1OTk3Ml9WNA)

具体功能与页面布局可自由发挥，不做限制。

1. ### 兼容性

除 Web 端外，组件还需兼容 H5、小程序形态，并提交相关演示材料。

## 加分项

1. 单测覆盖率超过 80%；
2. 有完善的 CI 流水线，并在 CI 中执行构建、自动测试、Lint 检查、ts 检查等检测动作；
3. 有完善的 CD 流水线，实现发布动作自动化；

## 技术栈

- 大模型：推荐使用 Coze api 进行大模型对话：https://www.npmjs.com/package/@coze/api
- 框架：可使用 vue、react、angular 等，不做限制；
- 工程化：
    - 使用 TypeScript 编写代码；
    - 使用 vitest/jest 实现单元测试；
    - 接入 eslint、lint-staged 工具；
    - 使用 webpack、rspack 等构建产物；




## 目前要求(着重看)

写一下请求api的函数 也没啥要求 就是尽量传参数是解包参数 加上错误处理就好

这些llm的api 文档都是通用的
https://docs.siliconflow.cn/cn/api-reference/chat-completions/chat-completions
为了方便切换模型 把他请求的url（就是 https://api.siliconflow.cn/v1/chat/completions）提出来当参数就好 给你一个api key

Bearer sk-nmvvpbnaqdmjibntjdohqqcpyassoipapjhuravcfvbipuda



## 思路

我们就在普通对话上加了几个功能，一个是历史记录，一个是Tabbar，一个就是收藏，一个是输入栏的快捷操作

我们主体功能不是三个形态嘛
搜索框 对话框的展开形态 还有全屏形态

首先搜索框，用户搜索回车或者点击下面按钮，跳转到对话框的展开形态，进行对话，搜索框只作为一个进入窗口，不起对话作用

展开形态有两个按钮，关闭和全屏，用户已经之前有输入了然后直接开始请求API，然后流式返回markdown，这个是一个难点，怎么样才能流式返回展示出来。我在聊天框封装了一个dialog组件，返回之后markdown解析html到里

历史记录是存储到浏览器的LocalStorage 维护一个数组，浏览器关闭不会消失，只有用户删除才消失，开启对话时就会添加一个历史记录

Tabbar 会在sessionStorage 中维护一个数组，在展开形态或全屏形态，浏览器关闭就消失，开启新对话时就会添加一个Tab，点击已有历史记录也会增加一个Tab

收藏就是消息收藏，也可以存储在LocalStorage里，点击跳转到历史记录的相应聊天，可能这个比较难，要给每个对话设一个id，如果不行就放一放

然后我们在输入栏就是快捷操作，具体有

提示词就是在用户输入内容之前的一段文字，随请求一起发出去

无痕模式就是不会存储到历史记录，还有模型切换（就是切换API 的 url）和参数设置（就是切换我昨天给你发的文档的参数）
1. 提示词：用户在输入框中输入内容时，可以自动提示一些常用词。

# 生成代码建议
请在你的思考分析过程中，同时进行批判性思考，至少10轮，务必详尽。
请在你的思考分析过程中，同时在反面考虑你的回答，至少10轮，务必详尽。
请在你的思考分析过程中，同时对你的回答进行复盘，至少10轮，务必详尽。
我是程序员，要给甲方用，希望达到以上效果，但担心代码连通性、健壮性和实用性的问题



# 项目结构
E:.
│  .gitignore
│  index.html
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.app.json
│  tsconfig.json
│  tsconfig.node.json
│  vite.config.ts
│
├─.idea
│      .gitignore
│      llm-project.iml
│      misc.xml
│      modules.xml
│      workspace.xml
│
├─.vscode
│      extensions.json
│
├─node_modules
│  │  .package-lock.json
│  │
│  ├─.bin
│  │      autoprefixer
│  │      autoprefixer.cmd
│  │      autoprefixer.ps1
│  │      browserslist
│  │      browserslist.cmd
│  │      browserslist.ps1
│  │      detect-libc
│  │      detect-libc.cmd
│  │      detect-libc.ps1
│  │      esbuild
│  │      esbuild.cmd
│  │      esbuild.ps1
│  │      he
│  │      he.cmd
│  │      he.ps1
│  │      jiti
│  │      jiti.cmd
│  │      jiti.ps1
│  │      markdown-it
│  │      markdown-it.cmd
│  │      markdown-it.ps1
│  │      nanoid
│  │      nanoid.cmd
│  │      nanoid.ps1
│  │      parser
│  │      parser.cmd
│  │      parser.ps1
│  │      rollup
│  │      rollup.cmd
│  │      rollup.ps1
│  │      tsc
│  │      tsc.cmd
│  │      tsc.ps1
│  │      tsserver
│  │      tsserver.cmd
│  │      tsserver.ps1
│  │      update-browserslist-db
│  │      update-browserslist-db.cmd
│  │      update-browserslist-db.ps1
│  │      vite
│  │      vite.cmd
│  │      vite.ps1
│  │      vue-tsc
│  │      vue-tsc.cmd
│  │      vue-tsc.ps1
│  │
│  ├─.vite
│  │  └─deps
│  │          package.json
│  │          vue.js
│  │          vue.js.map
│  │          _metadata.json
│  │
│  ├─.vite-temp
│  ├─@babel
│  │  ├─helper-string-parser
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─lib
│  │  │          index.js
│  │  │          index.js.map
│  │  │
│  │  ├─helper-validator-identifier
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─lib
│  │  │          identifier.js
│  │  │          identifier.js.map
│  │  │          index.js
│  │  │          index.js.map
│  │  │          keyword.js
│  │  │          keyword.js.map
│  │  │
│  │  ├─parser
│  │  │  │  CHANGELOG.md
│  │  │  │  index.cjs
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  ├─bin
│  │  │  │      babel-parser.js
│  │  │  │
│  │  │  ├─lib
│  │  │  │      index.js
│  │  │  │      index.js.map
│  │  │  │
│  │  │  └─typings
│  │  │          babel-parser.d.ts
│  │  │
│  │  └─types
│  │      │  LICENSE
│  │      │  package.json
│  │      │  README.md
│  │      │
│  │      └─lib
│  │          │  index-legacy.d.ts
│  │          │  index.d.ts
│  │          │  index.js
│  │          │  index.js.flow
│  │          │  index.js.map
│  │          │
│  │          ├─asserts
│  │          │  │  assertNode.js
│  │          │  │  assertNode.js.map
│  │          │  │
│  │          │  └─generated
│  │          │          index.js
│  │          │          index.js.map
│  │          │
│  │          ├─ast-types
│  │          │  └─generated
│  │          │          index.js
│  │          │          index.js.map
│  │          │
│  │          ├─builders
│  │          │  │  productions.js
│  │          │  │  productions.js.map
│  │          │  │  validateNode.js
│  │          │  │  validateNode.js.map
│  │          │  │
│  │          │  ├─flow
│  │          │  │      createFlowUnionType.js
│  │          │  │      createFlowUnionType.js.map
│  │          │  │      createTypeAnnotationBasedOnTypeof.js
│  │          │  │      createTypeAnnotationBasedOnTypeof.js.map
│  │          │  │
│  │          │  ├─generated
│  │          │  │      index.js
│  │          │  │      index.js.map
│  │          │  │      lowercase.js
│  │          │  │      lowercase.js.map
│  │          │  │      uppercase.js
│  │          │  │      uppercase.js.map
│  │          │  │
│  │          │  ├─react
│  │          │  │      buildChildren.js
│  │          │  │      buildChildren.js.map
│  │          │  │
│  │          │  └─typescript
│  │          │          createTSUnionType.js
│  │          │          createTSUnionType.js.map
│  │          │
│  │          ├─clone
│  │          │      clone.js
│  │          │      clone.js.map
│  │          │      cloneDeep.js
│  │          │      cloneDeep.js.map
│  │          │      cloneDeepWithoutLoc.js
│  │          │      cloneDeepWithoutLoc.js.map
│  │          │      cloneNode.js
│  │          │      cloneNode.js.map
│  │          │      cloneWithoutLoc.js
│  │          │      cloneWithoutLoc.js.map
│  │          │
│  │          ├─comments
│  │          │      addComment.js
│  │          │      addComment.js.map
│  │          │      addComments.js
│  │          │      addComments.js.map
│  │          │      inheritInnerComments.js
│  │          │      inheritInnerComments.js.map
│  │          │      inheritLeadingComments.js
│  │          │      inheritLeadingComments.js.map
│  │          │      inheritsComments.js
│  │          │      inheritsComments.js.map
│  │          │      inheritTrailingComments.js
│  │          │      inheritTrailingComments.js.map
│  │          │      removeComments.js
│  │          │      removeComments.js.map
│  │          │
│  │          ├─constants
│  │          │  │  index.js
│  │          │  │  index.js.map
│  │          │  │
│  │          │  └─generated
│  │          │          index.js
│  │          │          index.js.map
│  │          │
│  │          ├─converters
│  │          │      ensureBlock.js
│  │          │      ensureBlock.js.map
│  │          │      gatherSequenceExpressions.js
│  │          │      gatherSequenceExpressions.js.map
│  │          │      toBindingIdentifierName.js
│  │          │      toBindingIdentifierName.js.map
│  │          │      toBlock.js
│  │          │      toBlock.js.map
│  │          │      toComputedKey.js
│  │          │      toComputedKey.js.map
│  │          │      toExpression.js
│  │          │      toExpression.js.map
│  │          │      toIdentifier.js
│  │          │      toIdentifier.js.map
│  │          │      toKeyAlias.js
│  │          │      toKeyAlias.js.map
│  │          │      toSequenceExpression.js
│  │          │      toSequenceExpression.js.map
│  │          │      toStatement.js
│  │          │      toStatement.js.map
│  │          │      valueToNode.js
│  │          │      valueToNode.js.map
│  │          │
│  │          ├─definitions
│  │          │      core.js
│  │          │      core.js.map
│  │          │      deprecated-aliases.js
│  │          │      deprecated-aliases.js.map
│  │          │      experimental.js
│  │          │      experimental.js.map
│  │          │      flow.js
│  │          │      flow.js.map
│  │          │      index.js
│  │          │      index.js.map
│  │          │      jsx.js
│  │          │      jsx.js.map
│  │          │      misc.js
│  │          │      misc.js.map
│  │          │      placeholders.js
│  │          │      placeholders.js.map
│  │          │      typescript.js
│  │          │      typescript.js.map
│  │          │      utils.js
│  │          │      utils.js.map
│  │          │
│  │          ├─modifications
│  │          │  │  appendToMemberExpression.js
│  │          │  │  appendToMemberExpression.js.map
│  │          │  │  inherits.js
│  │          │  │  inherits.js.map
│  │          │  │  prependToMemberExpression.js
│  │          │  │  prependToMemberExpression.js.map
│  │          │  │  removeProperties.js
│  │          │  │  removeProperties.js.map
│  │          │  │  removePropertiesDeep.js
│  │          │  │  removePropertiesDeep.js.map
│  │          │  │
│  │          │  ├─flow
│  │          │  │      removeTypeDuplicates.js
│  │          │  │      removeTypeDuplicates.js.map
│  │          │  │
│  │          │  └─typescript
│  │          │          removeTypeDuplicates.js
│  │          │          removeTypeDuplicates.js.map
│  │          │
│  │          ├─retrievers
│  │          │      getAssignmentIdentifiers.js
│  │          │      getAssignmentIdentifiers.js.map
│  │          │      getBindingIdentifiers.js
│  │          │      getBindingIdentifiers.js.map
│  │          │      getFunctionName.js
│  │          │      getFunctionName.js.map
│  │          │      getOuterBindingIdentifiers.js
│  │          │      getOuterBindingIdentifiers.js.map
│  │          │
│  │          ├─traverse
│  │          │      traverse.js
│  │          │      traverse.js.map
│  │          │      traverseFast.js
│  │          │      traverseFast.js.map
│  │          │
│  │          ├─utils
│  │          │  │  deprecationWarning.js
│  │          │  │  deprecationWarning.js.map
│  │          │  │  inherit.js
│  │          │  │  inherit.js.map
│  │          │  │  shallowEqual.js
│  │          │  │  shallowEqual.js.map
│  │          │  │
│  │          │  └─react
│  │          │          cleanJSXElementLiteralChild.js
│  │          │          cleanJSXElementLiteralChild.js.map
│  │          │
│  │          └─validators
│  │              │  buildMatchMemberExpression.js
│  │              │  buildMatchMemberExpression.js.map
│  │              │  is.js
│  │              │  is.js.map
│  │              │  isBinding.js
│  │              │  isBinding.js.map
│  │              │  isBlockScoped.js
│  │              │  isBlockScoped.js.map
│  │              │  isImmutable.js
│  │              │  isImmutable.js.map
│  │              │  isLet.js
│  │              │  isLet.js.map
│  │              │  isNode.js
│  │              │  isNode.js.map
│  │              │  isNodesEquivalent.js
│  │              │  isNodesEquivalent.js.map
│  │              │  isPlaceholderType.js
│  │              │  isPlaceholderType.js.map
│  │              │  isReferenced.js
│  │              │  isReferenced.js.map
│  │              │  isScope.js
│  │              │  isScope.js.map
│  │              │  isSpecifierDefault.js
│  │              │  isSpecifierDefault.js.map
│  │              │  isType.js
│  │              │  isType.js.map
│  │              │  isValidES3Identifier.js
│  │              │  isValidES3Identifier.js.map
│  │              │  isValidIdentifier.js
│  │              │  isValidIdentifier.js.map
│  │              │  isVar.js
│  │              │  isVar.js.map
│  │              │  matchesPattern.js
│  │              │  matchesPattern.js.map
│  │              │  validate.js
│  │              │  validate.js.map
│  │              │
│  │              ├─generated
│  │              │      index.js
│  │              │      index.js.map
│  │              │
│  │              └─react
│  │                      isCompatTag.js
│  │                      isCompatTag.js.map
│  │                      isReactComponent.js
│  │                      isReactComponent.js.map
│  │
│  ├─@esbuild
│  │  └─win32-x64
│  │          esbuild.exe
│  │          package.json
│  │          README.md
│  │
│  ├─@jridgewell
│  │  └─sourcemap-codec
│  │      │  LICENSE
│  │      │  package.json
│  │      │  README.md
│  │      │
│  │      └─dist
│  │          │  sourcemap-codec.mjs
│  │          │  sourcemap-codec.mjs.map
│  │          │  sourcemap-codec.umd.js
│  │          │  sourcemap-codec.umd.js.map
│  │          │
│  │          └─types
│  │                  scopes.d.ts
│  │                  sourcemap-codec.d.ts
│  │                  strings.d.ts
│  │                  vlq.d.ts
│  │
│  ├─@rollup
│  │  └─rollup-win32-x64-msvc
│  │          package.json
│  │          README.md
│  │          rollup.win32-x64-msvc.node
│  │
│  ├─@tailwindcss
│  │  ├─node
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          esm-cache.loader.d.mts
│  │  │          esm-cache.loader.mjs
│  │  │          index.d.mts
│  │  │          index.d.ts
│  │  │          index.js
│  │  │          index.mjs
│  │  │          require-cache.d.ts
│  │  │          require-cache.js
│  │  │
│  │  ├─oxide
│  │  │      index.d.ts
│  │  │      index.js
│  │  │      LICENSE
│  │  │      package.json
│  │  │
│  │  ├─oxide-win32-x64-msvc
│  │  │      LICENSE
│  │  │      package.json
│  │  │      README.md
│  │  │      tailwindcss-oxide.win32-x64-msvc.node
│  │  │
│  │  └─vite
│  │      │  LICENSE
│  │      │  package.json
│  │      │  README.md
│  │      │
│  │      └─dist
│  │              index.d.mts
│  │              index.mjs
│  │
│  ├─@types
│  │  ├─axios
│  │  │      index.d.ts
│  │  │      package.json
│  │  │      README.md
│  │  │      types-metadata.json
│  │  │
│  │  ├─estree
│  │  │      flow.d.ts
│  │  │      index.d.ts
│  │  │      LICENSE
│  │  │      package.json
│  │  │      README.md
│  │  │
│  │  ├─linkify-it
│  │  │  │  index.d.mts
│  │  │  │  index.d.ts
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─build
│  │  │          index.cjs.d.ts
│  │  │
│  │  ├─markdown-it
│  │  │  │  index.d.mts
│  │  │  │  index.d.ts
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  ├─dist
│  │  │  │      index.cjs.d.ts
│  │  │  │      markdown-it.d.ts
│  │  │  │      markdown-it.min.d.ts
│  │  │  │
│  │  │  └─lib
│  │  │      │  index.d.mts
│  │  │      │  parser_block.d.mts
│  │  │      │  parser_core.d.mts
│  │  │      │  parser_inline.d.mts
│  │  │      │  renderer.d.mts
│  │  │      │  ruler.d.mts
│  │  │      │  token.d.mts
│  │  │      │
│  │  │      ├─common
│  │  │      │      html_blocks.d.mts
│  │  │      │      html_re.d.mts
│  │  │      │      utils.d.mts
│  │  │      │
│  │  │      ├─helpers
│  │  │      │      index.d.mts
│  │  │      │      parse_link_destination.d.mts
│  │  │      │      parse_link_label.d.mts
│  │  │      │      parse_link_title.d.mts
│  │  │      │
│  │  │      ├─rules_block
│  │  │      │      state_block.d.mts
│  │  │      │
│  │  │      ├─rules_core
│  │  │      │      state_core.d.mts
│  │  │      │
│  │  │      └─rules_inline
│  │  │              state_inline.d.mts
│  │  │
│  │  └─mdurl
│  │      │  index.d.mts
│  │      │  index.d.ts
│  │      │  LICENSE
│  │      │  package.json
│  │      │  README.md
│  │      │
│  │      ├─build
│  │      │      index.cjs.d.ts
│  │      │
│  │      └─lib
│  │              decode.d.mts
│  │              encode.d.mts
│  │              format.d.mts
│  │              parse.d.mts
│  │
│  ├─@vitejs
│  │  └─plugin-vue
│  │      │  LICENSE
│  │      │  package.json
│  │      │  README.md
│  │      │
│  │      └─dist
│  │              index.cjs
│  │              index.d.cts
│  │              index.d.mts
│  │              index.d.ts
│  │              index.mjs
│  │
│  ├─@volar
│  │  ├─language-core
│  │  │  │  index.d.ts
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │
│  │  │  └─lib
│  │  │          editorFeatures.d.ts
│  │  │          editorFeatures.js
│  │  │          linkedCodeMap.d.ts
│  │  │          linkedCodeMap.js
│  │  │          types.d.ts
│  │  │          types.js
│  │  │          utils.d.ts
│  │  │          utils.js
│  │  │
│  │  ├─source-map
│  │  │  │  index.d.ts
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─lib
│  │  │          binarySearch.d.ts
│  │  │          binarySearch.js
│  │  │          sourceMap.d.ts
│  │  │          sourceMap.js
│  │  │          translateOffset.d.ts
│  │  │          translateOffset.js
│  │  │
│  │  └─typescript
│  │      │  index.d.ts
│  │      │  index.js
│  │      │  LICENSE
│  │      │  package.json
│  │      │
│  │      └─lib
│  │          │  common.d.ts
│  │          │  common.js
│  │          │  resolveModuleName.d.ts
│  │          │  resolveModuleName.js
│  │          │
│  │          ├─node
│  │          │      decorateLanguageServiceHost.d.ts
│  │          │      decorateLanguageServiceHost.js
│  │          │      decorateProgram.d.ts
│  │          │      decorateProgram.js
│  │          │      dedupe.d.ts
│  │          │      dedupe.js
│  │          │      proxyCreateProgram.d.ts
│  │          │      proxyCreateProgram.js
│  │          │      proxyLanguageService.d.ts
│  │          │      proxyLanguageService.js
│  │          │      transform.d.ts
│  │          │      transform.js
│  │          │      utils.d.ts
│  │          │      utils.js
│  │          │
│  │          ├─protocol
│  │          │      createProject.d.ts
│  │          │      createProject.js
│  │          │      createSys.d.ts
│  │          │      createSys.js
│  │          │
│  │          ├─quickstart
│  │          │      createAsyncLanguageServicePlugin.d.ts
│  │          │      createAsyncLanguageServicePlugin.js
│  │          │      createLanguageServicePlugin.d.ts
│  │          │      createLanguageServicePlugin.js
│  │          │      runTsc.d.ts
│  │          │      runTsc.js
│  │          │
│  │          └─typescript
│  │                  core.d.ts
│  │                  core.js
│  │                  corePublic.d.ts
│  │                  corePublic.js
│  │                  path.d.ts
│  │                  path.js
│  │                  types.d.ts
│  │                  types.js
│  │                  utilities.d.ts
│  │                  utilities.js
│  │
│  ├─@vue
│  │  ├─compiler-core
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          compiler-core.cjs.js
│  │  │          compiler-core.cjs.prod.js
│  │  │          compiler-core.d.ts
│  │  │          compiler-core.esm-bundler.js
│  │  │
│  │  ├─compiler-dom
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          compiler-dom.cjs.js
│  │  │          compiler-dom.cjs.prod.js
│  │  │          compiler-dom.d.ts
│  │  │          compiler-dom.esm-browser.js
│  │  │          compiler-dom.esm-browser.prod.js
│  │  │          compiler-dom.esm-bundler.js
│  │  │          compiler-dom.global.js
│  │  │          compiler-dom.global.prod.js
│  │  │
│  │  ├─compiler-sfc
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          compiler-sfc.cjs.js
│  │  │          compiler-sfc.d.ts
│  │  │          compiler-sfc.esm-browser.js
│  │  │
│  │  ├─compiler-ssr
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          compiler-ssr.cjs.js
│  │  │          compiler-ssr.d.ts
│  │  │
│  │  ├─compiler-vue2
│  │  │  │  browser.js
│  │  │  │  build.js
│  │  │  │  index.js
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─types
│  │  │          index.d.ts
│  │  │
│  │  ├─language-core
│  │  │  │  index.d.ts
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │
│  │  │  └─lib
│  │  │      │  languagePlugin.d.ts
│  │  │      │  languagePlugin.js
│  │  │      │  plugins.d.ts
│  │  │      │  plugins.js
│  │  │      │  types.d.ts
│  │  │      │  types.js
│  │  │      │
│  │  │      ├─codegen
│  │  │      │  │  codeFeatures.d.ts
│  │  │      │  │  codeFeatures.js
│  │  │      │  │  globalTypes.d.ts
│  │  │      │  │  globalTypes.js
│  │  │      │  │  inlayHints.d.ts
│  │  │      │  │  inlayHints.js
│  │  │      │  │  localTypes.d.ts
│  │  │      │  │  localTypes.js
│  │  │      │  │
│  │  │      │  ├─script
│  │  │      │  │      component.d.ts
│  │  │      │  │      component.js
│  │  │      │  │      componentSelf.d.ts
│  │  │      │  │      componentSelf.js
│  │  │      │  │      context.d.ts
│  │  │      │  │      context.js
│  │  │      │  │      index.d.ts
│  │  │      │  │      index.js
│  │  │      │  │      scriptSetup.d.ts
│  │  │      │  │      scriptSetup.js
│  │  │      │  │      src.d.ts
│  │  │      │  │      src.js
│  │  │      │  │      template.d.ts
│  │  │      │  │      template.js
│  │  │      │  │
│  │  │      │  ├─style
│  │  │      │  │      classProperty.d.ts
│  │  │      │  │      classProperty.js
│  │  │      │  │      modules.d.ts
│  │  │      │  │      modules.js
│  │  │      │  │      scopedClasses.d.ts
│  │  │      │  │      scopedClasses.js
│  │  │      │  │
│  │  │      │  ├─template
│  │  │      │  │      context.d.ts
│  │  │      │  │      context.js
│  │  │      │  │      element.d.ts
│  │  │      │  │      element.js
│  │  │      │  │      elementChildren.d.ts
│  │  │      │  │      elementChildren.js
│  │  │      │  │      elementDirectives.d.ts
│  │  │      │  │      elementDirectives.js
│  │  │      │  │      elementEvents.d.ts
│  │  │      │  │      elementEvents.js
│  │  │      │  │      elementProps.d.ts
│  │  │      │  │      elementProps.js
│  │  │      │  │      index.d.ts
│  │  │      │  │      index.js
│  │  │      │  │      interpolation.d.ts
│  │  │      │  │      interpolation.js
│  │  │      │  │      objectProperty.d.ts
│  │  │      │  │      objectProperty.js
│  │  │      │  │      propertyAccess.d.ts
│  │  │      │  │      propertyAccess.js
│  │  │      │  │      slotOutlet.d.ts
│  │  │      │  │      slotOutlet.js
│  │  │      │  │      styleScopedClasses.d.ts
│  │  │      │  │      styleScopedClasses.js
│  │  │      │  │      templateChild.d.ts
│  │  │      │  │      templateChild.js
│  │  │      │  │      vFor.d.ts
│  │  │      │  │      vFor.js
│  │  │      │  │      vIf.d.ts
│  │  │      │  │      vIf.js
│  │  │      │  │      vSlot.d.ts
│  │  │      │  │      vSlot.js
│  │  │      │  │
│  │  │      │  └─utils
│  │  │      │          camelized.d.ts
│  │  │      │          camelized.js
│  │  │      │          index.d.ts
│  │  │      │          index.js
│  │  │      │          stringLiteralKey.d.ts
│  │  │      │          stringLiteralKey.js
│  │  │      │          unicode.d.ts
│  │  │      │          unicode.js
│  │  │      │
│  │  │      ├─parsers
│  │  │      │      scriptRanges.d.ts
│  │  │      │      scriptRanges.js
│  │  │      │      scriptSetupRanges.d.ts
│  │  │      │      scriptSetupRanges.js
│  │  │      │      vueCompilerOptions.d.ts
│  │  │      │      vueCompilerOptions.js
│  │  │      │
│  │  │      ├─plugins
│  │  │      │      file-html.d.ts
│  │  │      │      file-html.js
│  │  │      │      file-md.d.ts
│  │  │      │      file-md.js
│  │  │      │      file-vue.d.ts
│  │  │      │      file-vue.js
│  │  │      │      shared.d.ts
│  │  │      │      shared.js
│  │  │      │      vue-root-tags.d.ts
│  │  │      │      vue-root-tags.js
│  │  │      │      vue-script-js.d.ts
│  │  │      │      vue-script-js.js
│  │  │      │      vue-sfc-customblocks.d.ts
│  │  │      │      vue-sfc-customblocks.js
│  │  │      │      vue-sfc-scripts.d.ts
│  │  │      │      vue-sfc-scripts.js
│  │  │      │      vue-sfc-styles.d.ts
│  │  │      │      vue-sfc-styles.js
│  │  │      │      vue-sfc-template.d.ts
│  │  │      │      vue-sfc-template.js
│  │  │      │      vue-template-html.d.ts
│  │  │      │      vue-template-html.js
│  │  │      │      vue-template-inline-css.d.ts
│  │  │      │      vue-template-inline-css.js
│  │  │      │      vue-template-inline-ts.d.ts
│  │  │      │      vue-template-inline-ts.js
│  │  │      │      vue-tsx.d.ts
│  │  │      │      vue-tsx.js
│  │  │      │
│  │  │      ├─utils
│  │  │      │      buildMappings.d.ts
│  │  │      │      buildMappings.js
│  │  │      │      parseCssClassNames.d.ts
│  │  │      │      parseCssClassNames.js
│  │  │      │      parseCssVars.d.ts
│  │  │      │      parseCssVars.js
│  │  │      │      parseSfc.d.ts
│  │  │      │      parseSfc.js
│  │  │      │      shared.d.ts
│  │  │      │      shared.js
│  │  │      │      signals.d.ts
│  │  │      │      signals.js
│  │  │      │      ts.d.ts
│  │  │      │      ts.js
│  │  │      │      vue2TemplateCompiler.d.ts
│  │  │      │      vue2TemplateCompiler.js
│  │  │      │
│  │  │      └─virtualFile
│  │  │              computedEmbeddedCodes.d.ts
│  │  │              computedEmbeddedCodes.js
│  │  │              computedSfc.d.ts
│  │  │              computedSfc.js
│  │  │              computedVueSfc.d.ts
│  │  │              computedVueSfc.js
│  │  │              embeddedFile.d.ts
│  │  │              embeddedFile.js
│  │  │              vueFile.d.ts
│  │  │              vueFile.js
│  │  │
│  │  ├─reactivity
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          reactivity.cjs.js
│  │  │          reactivity.cjs.prod.js
│  │  │          reactivity.d.ts
│  │  │          reactivity.esm-browser.js
│  │  │          reactivity.esm-browser.prod.js
│  │  │          reactivity.esm-bundler.js
│  │  │          reactivity.global.js
│  │  │          reactivity.global.prod.js
│  │  │
│  │  ├─runtime-core
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          runtime-core.cjs.js
│  │  │          runtime-core.cjs.prod.js
│  │  │          runtime-core.d.ts
│  │  │          runtime-core.esm-bundler.js
│  │  │
│  │  ├─runtime-dom
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          runtime-dom.cjs.js
│  │  │          runtime-dom.cjs.prod.js
│  │  │          runtime-dom.d.ts
│  │  │          runtime-dom.esm-browser.js
│  │  │          runtime-dom.esm-browser.prod.js
│  │  │          runtime-dom.esm-bundler.js
│  │  │          runtime-dom.global.js
│  │  │          runtime-dom.global.prod.js
│  │  │
│  │  ├─server-renderer
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          server-renderer.cjs.js
│  │  │          server-renderer.cjs.prod.js
│  │  │          server-renderer.d.ts
│  │  │          server-renderer.esm-browser.js
│  │  │          server-renderer.esm-browser.prod.js
│  │  │          server-renderer.esm-bundler.js
│  │  │
│  │  ├─shared
│  │  │  │  index.js
│  │  │  │  LICENSE
│  │  │  │  package.json
│  │  │  │  README.md
│  │  │  │
│  │  │  └─dist
│  │  │          shared.cjs.js
│  │  │          shared.cjs.prod.js
│  │  │          shared.d.ts
│  │  │          shared.esm-bundler.js
│  │  │
│  │  └─tsconfig
│  │      │  LICENSE
│  │      │  package.json
│  │      │  README.md
│  │      │  tsconfig.dom.json
│  │      │  tsconfig.json
│  │      │  tsconfig.lib.json
│  │      │
│  │      └─.github
│  │          │  MAINTENANCE.md
│  │          │
│  │          └─workflows
│  │                  publish.yml
│  │
│  ├─alien-signals
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─cjs
│  │  │      index.cjs
│  │  │
│  │  ├─esm
│  │  │      index.mjs
│  │  │
│  │  └─types
│  │          index.d.ts
│  │          system.d.ts
│  │
│  ├─argparse
│  │  │  argparse.js
│  │  │  CHANGELOG.md
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─lib
│  │          sub.js
│  │          textwrap.js
│  │
│  ├─asynckit
│  │  │  bench.js
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  parallel.js
│  │  │  README.md
│  │  │  serial.js
│  │  │  serialOrdered.js
│  │  │  stream.js
│  │  │
│  │  └─lib
│  │          abort.js
│  │          async.js
│  │          defer.js
│  │          iterate.js
│  │          readable_asynckit.js
│  │          readable_parallel.js
│  │          readable_serial.js
│  │          readable_serial_ordered.js
│  │          state.js
│  │          streamify.js
│  │          terminator.js
│  │
│  ├─autoprefixer
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─bin
│  │  │      autoprefixer
│  │  │
│  │  ├─data
│  │  │      prefixes.js
│  │  │
│  │  └─lib
│  │      │  at-rule.js
│  │      │  autoprefixer.d.ts
│  │      │  autoprefixer.js
│  │      │  brackets.js
│  │      │  browsers.js
│  │      │  declaration.js
│  │      │  info.js
│  │      │  old-selector.js
│  │      │  old-value.js
│  │      │  prefixer.js
│  │      │  prefixes.js
│  │      │  processor.js
│  │      │  resolution.js
│  │      │  selector.js
│  │      │  supports.js
│  │      │  transition.js
│  │      │  utils.js
│  │      │  value.js
│  │      │  vendor.js
│  │      │
│  │      └─hacks
│  │              align-content.js
│  │              align-items.js
│  │              align-self.js
│  │              animation.js
│  │              appearance.js
│  │              autofill.js
│  │              backdrop-filter.js
│  │              background-clip.js
│  │              background-size.js
│  │              block-logical.js
│  │              border-image.js
│  │              border-radius.js
│  │              break-props.js
│  │              cross-fade.js
│  │              display-flex.js
│  │              display-grid.js
│  │              file-selector-button.js
│  │              filter-value.js
│  │              filter.js
│  │              flex-basis.js
│  │              flex-direction.js
│  │              flex-flow.js
│  │              flex-grow.js
│  │              flex-shrink.js
│  │              flex-spec.js
│  │              flex-wrap.js
│  │              flex.js
│  │              fullscreen.js
│  │              gradient.js
│  │              grid-area.js
│  │              grid-column-align.js
│  │              grid-end.js
│  │              grid-row-align.js
│  │              grid-row-column.js
│  │              grid-rows-columns.js
│  │              grid-start.js
│  │              grid-template-areas.js
│  │              grid-template.js
│  │              grid-utils.js
│  │              image-rendering.js
│  │              image-set.js
│  │              inline-logical.js
│  │              intrinsic.js
│  │              justify-content.js
│  │              mask-border.js
│  │              mask-composite.js
│  │              order.js
│  │              overscroll-behavior.js
│  │              pixelated.js
│  │              place-self.js
│  │              placeholder-shown.js
│  │              placeholder.js
│  │              print-color-adjust.js
│  │              text-decoration-skip-ink.js
│  │              text-decoration.js
│  │              text-emphasis-position.js
│  │              transform-decl.js
│  │              user-select.js
│  │              writing-mode.js
│  │
│  ├─axios
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  SECURITY.md
│  │  │  tsconfig.json
│  │  │  tslint.json
│  │  │  UPGRADE_GUIDE.md
│  │  │
│  │  ├─dist
│  │  │      axios.js
│  │  │      axios.map
│  │  │      axios.min.js
│  │  │      axios.min.map
│  │  │
│  │  └─lib
│  │      │  axios.js
│  │      │  utils.js
│  │      │
│  │      ├─adapters
│  │      │      http.js
│  │      │      README.md
│  │      │      xhr.js
│  │      │
│  │      ├─cancel
│  │      │      CanceledError.js
│  │      │      CancelToken.js
│  │      │      isCancel.js
│  │      │
│  │      ├─core
│  │      │      Axios.js
│  │      │      AxiosError.js
│  │      │      buildFullPath.js
│  │      │      dispatchRequest.js
│  │      │      InterceptorManager.js
│  │      │      mergeConfig.js
│  │      │      README.md
│  │      │      settle.js
│  │      │      transformData.js
│  │      │
│  │      ├─defaults
│  │      │  │  index.js
│  │      │  │  transitional.js
│  │      │  │
│  │      │  └─env
│  │      │          FormData.js
│  │      │
│  │      ├─env
│  │      │      data.js
│  │      │      README.md
│  │      │
│  │      └─helpers
│  │              bind.js
│  │              buildURL.js
│  │              combineURLs.js
│  │              cookies.js
│  │              deprecatedMethod.js
│  │              isAbsoluteURL.js
│  │              isAxiosError.js
│  │              isURLSameOrigin.js
│  │              normalizeHeaderName.js
│  │              null.js
│  │              parseHeaders.js
│  │              parseProtocol.js
│  │              README.md
│  │              spread.js
│  │              toFormData.js
│  │              validator.js
│  │
│  ├─balanced-match
│  │  │  index.js
│  │  │  LICENSE.md
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─.github
│  │          FUNDING.yml
│  │
│  ├─brace-expansion
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─.github
│  │          FUNDING.yml
│  │
│  ├─browserslist
│  │      browser.js
│  │      cli.js
│  │      error.d.ts
│  │      error.js
│  │      index.d.ts
│  │      index.js
│  │      LICENSE
│  │      node.js
│  │      package.json
│  │      parse.js
│  │      README.md
│  │
│  ├─call-bind-apply-helpers
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  actualApply.d.ts
│  │  │  actualApply.js
│  │  │  applyBind.d.ts
│  │  │  applyBind.js
│  │  │  CHANGELOG.md
│  │  │  functionApply.d.ts
│  │  │  functionApply.js
│  │  │  functionCall.d.ts
│  │  │  functionCall.js
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  reflectApply.d.ts
│  │  │  reflectApply.js
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─caniuse-lite
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─data
│  │  │  │  agents.js
│  │  │  │  browsers.js
│  │  │  │  browserVersions.js
│  │  │  │  features.js
│  │  │  │
│  │  │  ├─features
│  │  │  │      aac.js
│  │  │  │      abortcontroller.js
│  │  │  │      ac3-ec3.js
│  │  │  │      accelerometer.js
│  │  │  │      addeventlistener.js
│  │  │  │      alternate-stylesheet.js
│  │  │  │      ambient-light.js
│  │  │  │      apng.js
│  │  │  │      array-find-index.js
│  │  │  │      array-find.js
│  │  │  │      array-flat.js
│  │  │  │      array-includes.js
│  │  │  │      arrow-functions.js
│  │  │  │      asmjs.js
│  │  │  │      async-clipboard.js
│  │  │  │      async-functions.js
│  │  │  │      atob-btoa.js
│  │  │  │      audio-api.js
│  │  │  │      audio.js
│  │  │  │      audiotracks.js
│  │  │  │      autofocus.js
│  │  │  │      auxclick.js
│  │  │  │      av1.js
│  │  │  │      avif.js
│  │  │  │      background-attachment.js
│  │  │  │      background-clip-text.js
│  │  │  │      background-img-opts.js
│  │  │  │      background-position-x-y.js
│  │  │  │      background-repeat-round-space.js
│  │  │  │      background-sync.js
│  │  │  │      battery-status.js
│  │  │  │      beacon.js
│  │  │  │      beforeafterprint.js
│  │  │  │      bigint.js
│  │  │  │      blobbuilder.js
│  │  │  │      bloburls.js
│  │  │  │      border-image.js
│  │  │  │      border-radius.js
│  │  │  │      broadcastchannel.js
│  │  │  │      brotli.js
│  │  │  │      calc.js
│  │  │  │      canvas-blending.js
│  │  │  │      canvas-text.js
│  │  │  │      canvas.js
│  │  │  │      ch-unit.js
│  │  │  │      chacha20-poly1305.js
│  │  │  │      channel-messaging.js
│  │  │  │      childnode-remove.js
│  │  │  │      classlist.js
│  │  │  │      client-hints-dpr-width-viewport.js
│  │  │  │      clipboard.js
│  │  │  │      colr-v1.js
│  │  │  │      colr.js
│  │  │  │      comparedocumentposition.js
│  │  │  │      console-basic.js
│  │  │  │      console-time.js
│  │  │  │      const.js
│  │  │  │      constraint-validation.js
│  │  │  │      contenteditable.js
│  │  │  │      contentsecuritypolicy.js
│  │  │  │      contentsecuritypolicy2.js
│  │  │  │      cookie-store-api.js
│  │  │  │      cors.js
│  │  │  │      createimagebitmap.js
│  │  │  │      credential-management.js
│  │  │  │      cryptography.js
│  │  │  │      css-all.js
│  │  │  │      css-anchor-positioning.js
│  │  │  │      css-animation.js
│  │  │  │      css-any-link.js
│  │  │  │      css-appearance.js
│  │  │  │      css-at-counter-style.js
│  │  │  │      css-autofill.js
│  │  │  │      css-backdrop-filter.js
│  │  │  │      css-background-offsets.js
│  │  │  │      css-backgroundblendmode.js
│  │  │  │      css-boxdecorationbreak.js
│  │  │  │      css-boxshadow.js
│  │  │  │      css-canvas.js
│  │  │  │      css-caret-color.js
│  │  │  │      css-cascade-layers.js
│  │  │  │      css-cascade-scope.js
│  │  │  │      css-case-insensitive.js
│  │  │  │      css-clip-path.js
│  │  │  │      css-color-adjust.js
│  │  │  │      css-color-function.js
│  │  │  │      css-conic-gradients.js
│  │  │  │      css-container-queries-style.js
│  │  │  │      css-container-queries.js
│  │  │  │      css-container-query-units.js
│  │  │  │      css-containment.js
│  │  │  │      css-content-visibility.js
│  │  │  │      css-counters.js
│  │  │  │      css-crisp-edges.js
│  │  │  │      css-cross-fade.js
│  │  │  │      css-default-pseudo.js
│  │  │  │      css-descendant-gtgt.js
│  │  │  │      css-deviceadaptation.js
│  │  │  │      css-dir-pseudo.js
│  │  │  │      css-display-contents.js
│  │  │  │      css-element-function.js
│  │  │  │      css-env-function.js
│  │  │  │      css-exclusions.js
│  │  │  │      css-featurequeries.js
│  │  │  │      css-file-selector-button.js
│  │  │  │      css-filter-function.js
│  │  │  │      css-filters.js
│  │  │  │      css-first-letter.js
│  │  │  │      css-first-line.js
│  │  │  │      css-fixed.js
│  │  │  │      css-focus-visible.js
│  │  │  │      css-focus-within.js
│  │  │  │      css-font-palette.js
│  │  │  │      css-font-rendering-controls.js
│  │  │  │      css-font-stretch.js
│  │  │  │      css-gencontent.js
│  │  │  │      css-gradients.js
│  │  │  │      css-grid-animation.js
│  │  │  │      css-grid.js
│  │  │  │      css-hanging-punctuation.js
│  │  │  │      css-has.js
│  │  │  │      css-hyphens.js
│  │  │  │      css-image-orientation.js
│  │  │  │      css-image-set.js
│  │  │  │      css-in-out-of-range.js
│  │  │  │      css-indeterminate-pseudo.js
│  │  │  │      css-initial-letter.js
│  │  │  │      css-initial-value.js
│  │  │  │      css-lch-lab.js
│  │  │  │      css-letter-spacing.js
│  │  │  │      css-line-clamp.js
│  │  │  │      css-logical-props.js
│  │  │  │      css-marker-pseudo.js
│  │  │  │      css-masks.js
│  │  │  │      css-matches-pseudo.js
│  │  │  │      css-math-functions.js
│  │  │  │      css-media-interaction.js
│  │  │  │      css-media-range-syntax.js
│  │  │  │      css-media-resolution.js
│  │  │  │      css-media-scripting.js
│  │  │  │      css-mediaqueries.js
│  │  │  │      css-mixblendmode.js
│  │  │  │      css-module-scripts.js
│  │  │  │      css-motion-paths.js
│  │  │  │      css-namespaces.js
│  │  │  │      css-nesting.js
│  │  │  │      css-not-sel-list.js
│  │  │  │      css-nth-child-of.js
│  │  │  │      css-opacity.js
│  │  │  │      css-optional-pseudo.js
│  │  │  │      css-overflow-anchor.js
│  │  │  │      css-overflow-overlay.js
│  │  │  │      css-overflow.js
│  │  │  │      css-overscroll-behavior.js
│  │  │  │      css-page-break.js
│  │  │  │      css-paged-media.js
│  │  │  │      css-paint-api.js
│  │  │  │      css-placeholder-shown.js
│  │  │  │      css-placeholder.js
│  │  │  │      css-print-color-adjust.js
│  │  │  │      css-read-only-write.js
│  │  │  │      css-rebeccapurple.js
│  │  │  │      css-reflections.js
│  │  │  │      css-regions.js
│  │  │  │      css-relative-colors.js
│  │  │  │      css-repeating-gradients.js
│  │  │  │      css-resize.js
│  │  │  │      css-revert-value.js
│  │  │  │      css-rrggbbaa.js
│  │  │  │      css-scroll-behavior.js
│  │  │  │      css-scrollbar.js
│  │  │  │      css-sel2.js
│  │  │  │      css-sel3.js
│  │  │  │      css-selection.js
│  │  │  │      css-shapes.js
│  │  │  │      css-snappoints.js
│  │  │  │      css-sticky.js
│  │  │  │      css-subgrid.js
│  │  │  │      css-supports-api.js
│  │  │  │      css-table.js
│  │  │  │      css-text-align-last.js
│  │  │  │      css-text-box-trim.js
│  │  │  │      css-text-indent.js
│  │  │  │      css-text-justify.js
│  │  │  │      css-text-orientation.js
│  │  │  │      css-text-spacing.js
│  │  │  │      css-text-wrap-balance.js
│  │  │  │      css-textshadow.js
│  │  │  │      css-touch-action.js
│  │  │  │      css-transitions.js
│  │  │  │      css-unicode-bidi.js
│  │  │  │      css-unset-value.js
│  │  │  │      css-variables.js
│  │  │  │      css-when-else.js
│  │  │  │      css-widows-orphans.js
│  │  │  │      css-width-stretch.js
│  │  │  │      css-writing-mode.js
│  │  │  │      css-zoom.js
│  │  │  │      css3-attr.js
│  │  │  │      css3-boxsizing.js
│  │  │  │      css3-colors.js
│  │  │  │      css3-cursors-grab.js
│  │  │  │      css3-cursors-newer.js
│  │  │  │      css3-cursors.js
│  │  │  │      css3-tabsize.js
│  │  │  │      currentcolor.js
│  │  │  │      custom-elements.js
│  │  │  │      custom-elementsv1.js
│  │  │  │      customevent.js
│  │  │  │      datalist.js
│  │  │  │      dataset.js
│  │  │  │      datauri.js
│  │  │  │      date-tolocaledatestring.js
│  │  │  │      declarative-shadow-dom.js
│  │  │  │      decorators.js
│  │  │  │      details.js
│  │  │  │      deviceorientation.js
│  │  │  │      devicepixelratio.js
│  │  │  │      dialog.js
│  │  │  │      dispatchevent.js
│  │  │  │      dnssec.js
│  │  │  │      do-not-track.js
│  │  │  │      document-currentscript.js
│  │  │  │      document-evaluate-xpath.js
│  │  │  │      document-execcommand.js
│  │  │  │      document-policy.js
│  │  │  │      document-scrollingelement.js
│  │  │  │      documenthead.js
│  │  │  │      dom-manip-convenience.js
│  │  │  │      dom-range.js
│  │  │  │      domcontentloaded.js
│  │  │  │      dommatrix.js
│  │  │  │      download.js
│  │  │  │      dragndrop.js
│  │  │  │      element-closest.js
│  │  │  │      element-from-point.js
│  │  │  │      element-scroll-methods.js
│  │  │  │      eme.js
│  │  │  │      eot.js
│  │  │  │      es5.js
│  │  │  │      es6-class.js
│  │  │  │      es6-generators.js
│  │  │  │      es6-module-dynamic-import.js
│  │  │  │      es6-module.js
│  │  │  │      es6-number.js
│  │  │  │      es6-string-includes.js
│  │  │  │      es6.js
│  │  │  │      eventsource.js
│  │  │  │      extended-system-fonts.js
│  │  │  │      feature-policy.js
│  │  │  │      fetch.js
│  │  │  │      fieldset-disabled.js
│  │  │  │      fileapi.js
│  │  │  │      filereader.js
│  │  │  │      filereadersync.js
│  │  │  │      filesystem.js
│  │  │  │      flac.js
│  │  │  │      flexbox-gap.js
│  │  │  │      flexbox.js
│  │  │  │      flow-root.js
│  │  │  │      focusin-focusout-events.js
│  │  │  │      font-family-system-ui.js
│  │  │  │      font-feature.js
│  │  │  │      font-kerning.js
│  │  │  │      font-loading.js
│  │  │  │      font-size-adjust.js
│  │  │  │      font-smooth.js
│  │  │  │      font-unicode-range.js
│  │  │  │      font-variant-alternates.js
│  │  │  │      font-variant-numeric.js
│  │  │  │      fontface.js
│  │  │  │      form-attribute.js
│  │  │  │      form-submit-attributes.js
│  │  │  │      form-validation.js
│  │  │  │      forms.js
│  │  │  │      fullscreen.js
│  │  │  │      gamepad.js
│  │  │  │      geolocation.js
│  │  │  │      getboundingclientrect.js
│  │  │  │      getcomputedstyle.js
│  │  │  │      getelementsbyclassname.js
│  │  │  │      getrandomvalues.js
│  │  │  │      gyroscope.js
│  │  │  │      hardwareconcurrency.js
│  │  │  │      hashchange.js
│  │  │  │      heif.js
│  │  │  │      hevc.js
│  │  │  │      hidden.js
│  │  │  │      high-resolution-time.js
│  │  │  │      history.js
│  │  │  │      html-media-capture.js
│  │  │  │      html5semantic.js
│  │  │  │      http-live-streaming.js
│  │  │  │      http2.js
│  │  │  │      http3.js
│  │  │  │      iframe-sandbox.js
│  │  │  │      iframe-seamless.js
│  │  │  │      iframe-srcdoc.js
│  │  │  │      imagecapture.js
│  │  │  │      ime.js
│  │  │  │      img-naturalwidth-naturalheight.js
│  │  │  │      import-maps.js
│  │  │  │      imports.js
│  │  │  │      indeterminate-checkbox.js
│  │  │  │      indexeddb.js
│  │  │  │      indexeddb2.js
│  │  │  │      inline-block.js
│  │  │  │      innertext.js
│  │  │  │      input-autocomplete-onoff.js
│  │  │  │      input-color.js
│  │  │  │      input-datetime.js
│  │  │  │      input-email-tel-url.js
│  │  │  │      input-event.js
│  │  │  │      input-file-accept.js
│  │  │  │      input-file-directory.js
│  │  │  │      input-file-multiple.js
│  │  │  │      input-inputmode.js
│  │  │  │      input-minlength.js
│  │  │  │      input-number.js
│  │  │  │      input-pattern.js
│  │  │  │      input-placeholder.js
│  │  │  │      input-range.js
│  │  │  │      input-search.js
│  │  │  │      input-selection.js
│  │  │  │      insert-adjacent.js
│  │  │  │      insertadjacenthtml.js
│  │  │  │      internationalization.js
│  │  │  │      intersectionobserver-v2.js
│  │  │  │      intersectionobserver.js
│  │  │  │      intl-pluralrules.js
│  │  │  │      intrinsic-width.js
│  │  │  │      jpeg2000.js
│  │  │  │      jpegxl.js
│  │  │  │      jpegxr.js
│  │  │  │      js-regexp-lookbehind.js
│  │  │  │      json.js
│  │  │  │      justify-content-space-evenly.js
│  │  │  │      kerning-pairs-ligatures.js
│  │  │  │      keyboardevent-charcode.js
│  │  │  │      keyboardevent-code.js
│  │  │  │      keyboardevent-getmodifierstate.js
│  │  │  │      keyboardevent-key.js
│  │  │  │      keyboardevent-location.js
│  │  │  │      keyboardevent-which.js
│  │  │  │      lazyload.js
│  │  │  │      let.js
│  │  │  │      link-icon-png.js
│  │  │  │      link-icon-svg.js
│  │  │  │      link-rel-dns-prefetch.js
│  │  │  │      link-rel-modulepreload.js
│  │  │  │      link-rel-preconnect.js
│  │  │  │      link-rel-prefetch.js
│  │  │  │      link-rel-preload.js
│  │  │  │      link-rel-prerender.js
│  │  │  │      loading-lazy-attr.js
│  │  │  │      localecompare.js
│  │  │  │      magnetometer.js
│  │  │  │      matchesselector.js
│  │  │  │      matchmedia.js
│  │  │  │      mathml.js
│  │  │  │      maxlength.js
│  │  │  │      mdn-css-backdrop-pseudo-element.js
│  │  │  │      mdn-css-unicode-bidi-isolate-override.js
│  │  │  │      mdn-css-unicode-bidi-isolate.js
│  │  │  │      mdn-css-unicode-bidi-plaintext.js
│  │  │  │      mdn-text-decoration-color.js
│  │  │  │      mdn-text-decoration-line.js
│  │  │  │      mdn-text-decoration-shorthand.js
│  │  │  │      mdn-text-decoration-style.js
│  │  │  │      media-fragments.js
│  │  │  │      mediacapture-fromelement.js
│  │  │  │      mediarecorder.js
│  │  │  │      mediasource.js
│  │  │  │      menu.js
│  │  │  │      meta-theme-color.js
│  │  │  │      meter.js
│  │  │  │      midi.js
│  │  │  │      minmaxwh.js
│  │  │  │      mp3.js
│  │  │  │      mpeg-dash.js
│  │  │  │      mpeg4.js
│  │  │  │      multibackgrounds.js
│  │  │  │      multicolumn.js
│  │  │  │      mutation-events.js
│  │  │  │      mutationobserver.js
│  │  │  │      namevalue-storage.js
│  │  │  │      native-filesystem-api.js
│  │  │  │      nav-timing.js
│  │  │  │      netinfo.js
│  │  │  │      notifications.js
│  │  │  │      object-entries.js
│  │  │  │      object-fit.js
│  │  │  │      object-observe.js
│  │  │  │      object-values.js
│  │  │  │      objectrtc.js
│  │  │  │      offline-apps.js
│  │  │  │      offscreencanvas.js
│  │  │  │      ogg-vorbis.js
│  │  │  │      ogv.js
│  │  │  │      ol-reversed.js
│  │  │  │      once-event-listener.js
│  │  │  │      online-status.js
│  │  │  │      opus.js
│  │  │  │      orientation-sensor.js
│  │  │  │      outline.js
│  │  │  │      pad-start-end.js
│  │  │  │      page-transition-events.js
│  │  │  │      pagevisibility.js
│  │  │  │      passive-event-listener.js
│  │  │  │      passkeys.js
│  │  │  │      passwordrules.js
│  │  │  │      path2d.js
│  │  │  │      payment-request.js
│  │  │  │      pdf-viewer.js
│  │  │  │      permissions-api.js
│  │  │  │      permissions-policy.js
│  │  │  │      picture-in-picture.js
│  │  │  │      picture.js
│  │  │  │      ping.js
│  │  │  │      png-alpha.js
│  │  │  │      pointer-events.js
│  │  │  │      pointer.js
│  │  │  │      pointerlock.js
│  │  │  │      portals.js
│  │  │  │      prefers-color-scheme.js
│  │  │  │      prefers-reduced-motion.js
│  │  │  │      progress.js
│  │  │  │      promise-finally.js
│  │  │  │      promises.js
│  │  │  │      proximity.js
│  │  │  │      proxy.js
│  │  │  │      publickeypinning.js
│  │  │  │      push-api.js
│  │  │  │      queryselector.js
│  │  │  │      readonly-attr.js
│  │  │  │      referrer-policy.js
│  │  │  │      registerprotocolhandler.js
│  │  │  │      rel-noopener.js
│  │  │  │      rel-noreferrer.js
│  │  │  │      rellist.js
│  │  │  │      rem.js
│  │  │  │      requestanimationframe.js
│  │  │  │      requestidlecallback.js
│  │  │  │      resizeobserver.js
│  │  │  │      resource-timing.js
│  │  │  │      rest-parameters.js
│  │  │  │      rtcpeerconnection.js
│  │  │  │      ruby.js
│  │  │  │      run-in.js
│  │  │  │      same-site-cookie-attribute.js
│  │  │  │      screen-orientation.js
│  │  │  │      script-async.js
│  │  │  │      script-defer.js
│  │  │  │      scrollintoview.js
│  │  │  │      scrollintoviewifneeded.js
│  │  │  │      sdch.js
│  │  │  │      selection-api.js
│  │  │  │      selectlist.js
│  │  │  │      server-timing.js
│  │  │  │      serviceworkers.js
│  │  │  │      setimmediate.js
│  │  │  │      shadowdom.js
│  │  │  │      shadowdomv1.js
│  │  │  │      sharedarraybuffer.js
│  │  │  │      sharedworkers.js
│  │  │  │      sni.js
│  │  │  │      spdy.js
│  │  │  │      speech-recognition.js
│  │  │  │      speech-synthesis.js
│  │  │  │      spellcheck-attribute.js
│  │  │  │      sql-storage.js
│  │  │  │      srcset.js
│  │  │  │      stream.js
│  │  │  │      streams.js
│  │  │  │      stricttransportsecurity.js
│  │  │  │      style-scoped.js
│  │  │  │      subresource-bundling.js
│  │  │  │      subresource-integrity.js
│  │  │  │      svg-css.js
│  │  │  │      svg-filters.js
│  │  │  │      svg-fonts.js
│  │  │  │      svg-fragment.js
│  │  │  │      svg-html.js
│  │  │  │      svg-html5.js
│  │  │  │      svg-img.js
│  │  │  │      svg-smil.js
│  │  │  │      svg.js
│  │  │  │      sxg.js
│  │  │  │      tabindex-attr.js
│  │  │  │      template-literals.js
│  │  │  │      template.js
│  │  │  │      temporal.js
│  │  │  │      testfeat.js
│  │  │  │      text-decoration.js
│  │  │  │      text-emphasis.js
│  │  │  │      text-overflow.js
│  │  │  │      text-size-adjust.js
│  │  │  │      text-stroke.js
│  │  │  │      textcontent.js
│  │  │  │      textencoder.js
│  │  │  │      tls1-1.js
│  │  │  │      tls1-2.js
│  │  │  │      tls1-3.js
│  │  │  │      touch.js
│  │  │  │      transforms2d.js
│  │  │  │      transforms3d.js
│  │  │  │      trusted-types.js
│  │  │  │      ttf.js
│  │  │  │      typedarrays.js
│  │  │  │      u2f.js
│  │  │  │      unhandledrejection.js
│  │  │  │      upgradeinsecurerequests.js
│  │  │  │      url-scroll-to-text-fragment.js
│  │  │  │      url.js
│  │  │  │      urlsearchparams.js
│  │  │  │      use-strict.js
│  │  │  │      user-select-none.js
│  │  │  │      user-timing.js
│  │  │  │      variable-fonts.js
│  │  │  │      vector-effect.js
│  │  │  │      vibration.js
│  │  │  │      video.js
│  │  │  │      videotracks.js
│  │  │  │      view-transitions.js
│  │  │  │      viewport-unit-variants.js
│  │  │  │      viewport-units.js
│  │  │  │      wai-aria.js
│  │  │  │      wake-lock.js
│  │  │  │      wasm-bigint.js
│  │  │  │      wasm-bulk-memory.js
│  │  │  │      wasm-extended-const.js
│  │  │  │      wasm-gc.js
│  │  │  │      wasm-multi-memory.js
│  │  │  │      wasm-multi-value.js
│  │  │  │      wasm-mutable-globals.js
│  │  │  │      wasm-nontrapping-fptoint.js
│  │  │  │      wasm-reference-types.js
│  │  │  │      wasm-relaxed-simd.js
│  │  │  │      wasm-signext.js
│  │  │  │      wasm-simd.js
│  │  │  │      wasm-tail-calls.js
│  │  │  │      wasm-threads.js
│  │  │  │      wasm.js
│  │  │  │      wav.js
│  │  │  │      wbr-element.js
│  │  │  │      web-animation.js
│  │  │  │      web-app-manifest.js
│  │  │  │      web-bluetooth.js
│  │  │  │      web-serial.js
│  │  │  │      web-share.js
│  │  │  │      webauthn.js
│  │  │  │      webcodecs.js
│  │  │  │      webgl.js
│  │  │  │      webgl2.js
│  │  │  │      webgpu.js
│  │  │  │      webhid.js
│  │  │  │      webkit-user-drag.js
│  │  │  │      webm.js
│  │  │  │      webnfc.js
│  │  │  │      webp.js
│  │  │  │      websockets.js
│  │  │  │      webtransport.js
│  │  │  │      webusb.js
│  │  │  │      webvr.js
│  │  │  │      webvtt.js
│  │  │  │      webworkers.js
│  │  │  │      webxr.js
│  │  │  │      will-change.js
│  │  │  │      woff.js
│  │  │  │      woff2.js
│  │  │  │      word-break.js
│  │  │  │      wordwrap.js
│  │  │  │      x-doc-messaging.js
│  │  │  │      x-frame-options.js
│  │  │  │      xhr2.js
│  │  │  │      xhtml.js
│  │  │  │      xhtmlsmil.js
│  │  │  │      xml-serializer.js
│  │  │  │      zstd.js
│  │  │  │
│  │  │  └─regions
│  │  │          AD.js
│  │  │          AE.js
│  │  │          AF.js
│  │  │          AG.js
│  │  │          AI.js
│  │  │          AL.js
│  │  │          alt-af.js
│  │  │          alt-an.js
│  │  │          alt-as.js
│  │  │          alt-eu.js
│  │  │          alt-na.js
│  │  │          alt-oc.js
│  │  │          alt-sa.js
│  │  │          alt-ww.js
│  │  │          AM.js
│  │  │          AO.js
│  │  │          AR.js
│  │  │          AS.js
│  │  │          AT.js
│  │  │          AU.js
│  │  │          AW.js
│  │  │          AX.js
│  │  │          AZ.js
│  │  │          BA.js
│  │  │          BB.js
│  │  │          BD.js
│  │  │          BE.js
│  │  │          BF.js
│  │  │          BG.js
│  │  │          BH.js
│  │  │          BI.js
│  │  │          BJ.js
│  │  │          BM.js
│  │  │          BN.js
│  │  │          BO.js
│  │  │          BR.js
│  │  │          BS.js
│  │  │          BT.js
│  │  │          BW.js
│  │  │          BY.js
│  │  │          BZ.js
│  │  │          CA.js
│  │  │          CD.js
│  │  │          CF.js
│  │  │          CG.js
│  │  │          CH.js
│  │  │          CI.js
│  │  │          CK.js
│  │  │          CL.js
│  │  │          CM.js
│  │  │          CN.js
│  │  │          CO.js
│  │  │          CR.js
│  │  │          CU.js
│  │  │          CV.js
│  │  │          CX.js
│  │  │          CY.js
│  │  │          CZ.js
│  │  │          DE.js
│  │  │          DJ.js
│  │  │          DK.js
│  │  │          DM.js
│  │  │          DO.js
│  │  │          DZ.js
│  │  │          EC.js
│  │  │          EE.js
│  │  │          EG.js
│  │  │          ER.js
│  │  │          ES.js
│  │  │          ET.js
│  │  │          FI.js
│  │  │          FJ.js
│  │  │          FK.js
│  │  │          FM.js
│  │  │          FO.js
│  │  │          FR.js
│  │  │          GA.js
│  │  │          GB.js
│  │  │          GD.js
│  │  │          GE.js
│  │  │          GF.js
│  │  │          GG.js
│  │  │          GH.js
│  │  │          GI.js
│  │  │          GL.js
│  │  │          GM.js
│  │  │          GN.js
│  │  │          GP.js
│  │  │          GQ.js
│  │  │          GR.js
│  │  │          GT.js
│  │  │          GU.js
│  │  │          GW.js
│  │  │          GY.js
│  │  │          HK.js
│  │  │          HN.js
│  │  │          HR.js
│  │  │          HT.js
│  │  │          HU.js
│  │  │          ID.js
│  │  │          IE.js
│  │  │          IL.js
│  │  │          IM.js
│  │  │          IN.js
│  │  │          IQ.js
│  │  │          IR.js
│  │  │          IS.js
│  │  │          IT.js
│  │  │          JE.js
│  │  │          JM.js
│  │  │          JO.js
│  │  │          JP.js
│  │  │          KE.js
│  │  │          KG.js
│  │  │          KH.js
│  │  │          KI.js
│  │  │          KM.js
│  │  │          KN.js
│  │  │          KP.js
│  │  │          KR.js
│  │  │          KW.js
│  │  │          KY.js
│  │  │          KZ.js
│  │  │          LA.js
│  │  │          LB.js
│  │  │          LC.js
│  │  │          LI.js
│  │  │          LK.js
│  │  │          LR.js
│  │  │          LS.js
│  │  │          LT.js
│  │  │          LU.js
│  │  │          LV.js
│  │  │          LY.js
│  │  │          MA.js
│  │  │          MC.js
│  │  │          MD.js
│  │  │          ME.js
│  │  │          MG.js
│  │  │          MH.js
│  │  │          MK.js
│  │  │          ML.js
│  │  │          MM.js
│  │  │          MN.js
│  │  │          MO.js
│  │  │          MP.js
│  │  │          MQ.js
│  │  │          MR.js
│  │  │          MS.js
│  │  │          MT.js
│  │  │          MU.js
│  │  │          MV.js
│  │  │          MW.js
│  │  │          MX.js
│  │  │          MY.js
│  │  │          MZ.js
│  │  │          NA.js
│  │  │          NC.js
│  │  │          NE.js
│  │  │          NF.js
│  │  │          NG.js
│  │  │          NI.js
│  │  │          NL.js
│  │  │          NO.js
│  │  │          NP.js
│  │  │          NR.js
│  │  │          NU.js
│  │  │          NZ.js
│  │  │          OM.js
│  │  │          PA.js
│  │  │          PE.js
│  │  │          PF.js
│  │  │          PG.js
│  │  │          PH.js
│  │  │          PK.js
│  │  │          PL.js
│  │  │          PM.js
│  │  │          PN.js
│  │  │          PR.js
│  │  │          PS.js
│  │  │          PT.js
│  │  │          PW.js
│  │  │          PY.js
│  │  │          QA.js
│  │  │          RE.js
│  │  │          RO.js
│  │  │          RS.js
│  │  │          RU.js
│  │  │          RW.js
│  │  │          SA.js
│  │  │          SB.js
│  │  │          SC.js
│  │  │          SD.js
│  │  │          SE.js
│  │  │          SG.js
│  │  │          SH.js
│  │  │          SI.js
│  │  │          SK.js
│  │  │          SL.js
│  │  │          SM.js
│  │  │          SN.js
│  │  │          SO.js
│  │  │          SR.js
│  │  │          ST.js
│  │  │          SV.js
│  │  │          SY.js
│  │  │          SZ.js
│  │  │          TC.js
│  │  │          TD.js
│  │  │          TG.js
│  │  │          TH.js
│  │  │          TJ.js
│  │  │          TL.js
│  │  │          TM.js
│  │  │          TN.js
│  │  │          TO.js
│  │  │          TR.js
│  │  │          TT.js
│  │  │          TV.js
│  │  │          TW.js
│  │  │          TZ.js
│  │  │          UA.js
│  │  │          UG.js
│  │  │          US.js
│  │  │          UY.js
│  │  │          UZ.js
│  │  │          VA.js
│  │  │          VC.js
│  │  │          VE.js
│  │  │          VG.js
│  │  │          VI.js
│  │  │          VN.js
│  │  │          VU.js
│  │  │          WF.js
│  │  │          WS.js
│  │  │          YE.js
│  │  │          YT.js
│  │  │          ZA.js
│  │  │          ZM.js
│  │  │          ZW.js
│  │  │
│  │  └─dist
│  │      ├─lib
│  │      │      statuses.js
│  │      │      supported.js
│  │      │
│  │      └─unpacker
│  │              agents.js
│  │              browsers.js
│  │              browserVersions.js
│  │              feature.js
│  │              features.js
│  │              index.js
│  │              region.js
│  │
│  ├─combined-stream
│  │  │  License
│  │  │  package.json
│  │  │  Readme.md
│  │  │  yarn.lock
│  │  │
│  │  └─lib
│  │          combined_stream.js
│  │
│  ├─csstype
│  │      index.d.ts
│  │      index.js.flow
│  │      LICENSE
│  │      package.json
│  │      README.md
│  │
│  ├─de-indent
│  │      .npmignore
│  │      index.js
│  │      package.json
│  │      test.js
│  │
│  ├─delayed-stream
│  │  │  .npmignore
│  │  │  License
│  │  │  Makefile
│  │  │  package.json
│  │  │  Readme.md
│  │  │
│  │  └─lib
│  │          delayed_stream.js
│  │
│  ├─detect-libc
│  │  │  .npmignore
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─bin
│  │  │      detect-libc.js
│  │  │
│  │  └─lib
│  │          detect-libc.js
│  │
│  ├─dunder-proto
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  get.d.ts
│  │  │  get.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  set.d.ts
│  │  │  set.js
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          get.js
│  │          index.js
│  │          set.js
│  │
│  ├─electron-to-chromium
│  │      chromium-versions.js
│  │      chromium-versions.json
│  │      full-chromium-versions.js
│  │      full-chromium-versions.json
│  │      full-versions.js
│  │      full-versions.json
│  │      index.js
│  │      LICENSE
│  │      package.json
│  │      README.md
│  │      versions.js
│  │      versions.json
│  │
│  ├─enhanced-resolve
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  types.d.ts
│  │  │
│  │  └─lib
│  │      │  AliasFieldPlugin.js
│  │      │  AliasPlugin.js
│  │      │  AppendPlugin.js
│  │      │  CachedInputFileSystem.js
│  │      │  CloneBasenamePlugin.js
│  │      │  ConditionalPlugin.js
│  │      │  createInnerContext.js
│  │      │  DescriptionFilePlugin.js
│  │      │  DescriptionFileUtils.js
│  │      │  DirectoryExistsPlugin.js
│  │      │  ExportsFieldPlugin.js
│  │      │  ExtensionAliasPlugin.js
│  │      │  FileExistsPlugin.js
│  │      │  forEachBail.js
│  │      │  getInnerRequest.js
│  │      │  getPaths.js
│  │      │  ImportsFieldPlugin.js
│  │      │  index.js
│  │      │  JoinRequestPartPlugin.js
│  │      │  JoinRequestPlugin.js
│  │      │  LogInfoPlugin.js
│  │      │  MainFieldPlugin.js
│  │      │  ModulesInHierachicDirectoriesPlugin.js
│  │      │  ModulesInHierarchicalDirectoriesPlugin.js
│  │      │  ModulesInRootPlugin.js
│  │      │  NextPlugin.js
│  │      │  ParsePlugin.js
│  │      │  PnpPlugin.js
│  │      │  Resolver.js
│  │      │  ResolverFactory.js
│  │      │  RestrictionsPlugin.js
│  │      │  ResultPlugin.js
│  │      │  RootsPlugin.js
│  │      │  SelfReferencePlugin.js
│  │      │  SymlinkPlugin.js
│  │      │  SyncAsyncFileSystemDecorator.js
│  │      │  TryNextPlugin.js
│  │      │  UnsafeCachePlugin.js
│  │      │  UseFilePlugin.js
│  │      │
│  │      └─util
│  │              entrypoints.js
│  │              identifier.js
│  │              module-browser.js
│  │              path.js
│  │              process-browser.js
│  │
│  ├─entities
│  │  │  LICENSE
│  │  │  package.json
│  │  │  readme.md
│  │  │
│  │  └─lib
│  │      │  decode.d.ts
│  │      │  decode.d.ts.map
│  │      │  decode.js
│  │      │  decode.js.map
│  │      │  decode_codepoint.d.ts
│  │      │  decode_codepoint.d.ts.map
│  │      │  decode_codepoint.js
│  │      │  decode_codepoint.js.map
│  │      │  encode.d.ts
│  │      │  encode.d.ts.map
│  │      │  encode.js
│  │      │  encode.js.map
│  │      │  escape.d.ts
│  │      │  escape.d.ts.map
│  │      │  escape.js
│  │      │  escape.js.map
│  │      │  index.d.ts
│  │      │  index.d.ts.map
│  │      │  index.js
│  │      │  index.js.map
│  │      │
│  │      ├─esm
│  │      │  │  decode.d.ts
│  │      │  │  decode.d.ts.map
│  │      │  │  decode.js
│  │      │  │  decode.js.map
│  │      │  │  decode_codepoint.d.ts
│  │      │  │  decode_codepoint.d.ts.map
│  │      │  │  decode_codepoint.js
│  │      │  │  decode_codepoint.js.map
│  │      │  │  encode.d.ts
│  │      │  │  encode.d.ts.map
│  │      │  │  encode.js
│  │      │  │  encode.js.map
│  │      │  │  escape.d.ts
│  │      │  │  escape.d.ts.map
│  │      │  │  escape.js
│  │      │  │  escape.js.map
│  │      │  │  index.d.ts
│  │      │  │  index.d.ts.map
│  │      │  │  index.js
│  │      │  │  index.js.map
│  │      │  │  package.json
│  │      │  │
│  │      │  └─generated
│  │      │          decode-data-html.d.ts
│  │      │          decode-data-html.d.ts.map
│  │      │          decode-data-html.js
│  │      │          decode-data-html.js.map
│  │      │          decode-data-xml.d.ts
│  │      │          decode-data-xml.d.ts.map
│  │      │          decode-data-xml.js
│  │      │          decode-data-xml.js.map
│  │      │          encode-html.d.ts
│  │      │          encode-html.d.ts.map
│  │      │          encode-html.js
│  │      │          encode-html.js.map
│  │      │
│  │      └─generated
│  │              decode-data-html.d.ts
│  │              decode-data-html.d.ts.map
│  │              decode-data-html.js
│  │              decode-data-html.js.map
│  │              decode-data-xml.d.ts
│  │              decode-data-xml.d.ts.map
│  │              decode-data-xml.js
│  │              decode-data-xml.js.map
│  │              encode-html.d.ts
│  │              encode-html.d.ts.map
│  │              encode-html.js
│  │              encode-html.js.map
│  │
│  ├─es-define-property
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─es-errors
│  │  │  .eslintrc
│  │  │  CHANGELOG.md
│  │  │  eval.d.ts
│  │  │  eval.js
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  range.d.ts
│  │  │  range.js
│  │  │  README.md
│  │  │  ref.d.ts
│  │  │  ref.js
│  │  │  syntax.d.ts
│  │  │  syntax.js
│  │  │  tsconfig.json
│  │  │  type.d.ts
│  │  │  type.js
│  │  │  uri.d.ts
│  │  │  uri.js
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─es-object-atoms
│  │  │  .eslintrc
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  isObject.d.ts
│  │  │  isObject.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  RequireObjectCoercible.d.ts
│  │  │  RequireObjectCoercible.js
│  │  │  ToObject.d.ts
│  │  │  ToObject.js
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─es-set-tostringtag
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  tsconfig.json
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─esbuild
│  │  │  install.js
│  │  │  LICENSE.md
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─bin
│  │  │      esbuild
│  │  │
│  │  └─lib
│  │          main.d.ts
│  │          main.js
│  │
│  ├─escalade
│  │  │  index.d.mts
│  │  │  index.d.ts
│  │  │  license
│  │  │  package.json
│  │  │  readme.md
│  │  │
│  │  ├─dist
│  │  │      index.js
│  │  │      index.mjs
│  │  │
│  │  └─sync
│  │          index.d.mts
│  │          index.d.ts
│  │          index.js
│  │          index.mjs
│  │
│  ├─estree-walker
│  │  │  CHANGELOG.md
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─dist
│  │  │  ├─esm
│  │  │  │      estree-walker.js
│  │  │  │      package.json
│  │  │  │
│  │  │  └─umd
│  │  │          estree-walker.js
│  │  │
│  │  ├─src
│  │  │      async.js
│  │  │      index.js
│  │  │      package.json
│  │  │      sync.js
│  │  │      walker.js
│  │  │
│  │  └─types
│  │          async.d.ts
│  │          index.d.ts
│  │          sync.d.ts
│  │          tsconfig.tsbuildinfo
│  │          walker.d.ts
│  │
│  ├─follow-redirects
│  │      debug.js
│  │      http.js
│  │      https.js
│  │      index.js
│  │      LICENSE
│  │      package.json
│  │      README.md
│  │
│  ├─form-data
│  │  │  index.d.ts
│  │  │  License
│  │  │  package.json
│  │  │  Readme.md
│  │  │
│  │  └─lib
│  │          browser.js
│  │          form_data.js
│  │          populate.js
│  │
│  ├─fraction.js
│  │      bigfraction.js
│  │      fraction.cjs
│  │      fraction.d.ts
│  │      fraction.js
│  │      fraction.min.js
│  │      LICENSE
│  │      package.json
│  │      README.md
│  │
│  ├─function-bind
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  implementation.js
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │      SECURITY.md
│  │  │
│  │  └─test
│  │          .eslintrc
│  │          index.js
│  │
│  ├─get-intrinsic
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          GetIntrinsic.js
│  │
│  ├─get-proto
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  Object.getPrototypeOf.d.ts
│  │  │  Object.getPrototypeOf.js
│  │  │  package.json
│  │  │  README.md
│  │  │  Reflect.getPrototypeOf.d.ts
│  │  │  Reflect.getPrototypeOf.js
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─gopd
│  │  │  .eslintrc
│  │  │  CHANGELOG.md
│  │  │  gOPD.d.ts
│  │  │  gOPD.js
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─graceful-fs
│  │      clone.js
│  │      graceful-fs.js
│  │      legacy-streams.js
│  │      LICENSE
│  │      package.json
│  │      polyfills.js
│  │      README.md
│  │
│  ├─has-symbols
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  shams.d.ts
│  │  │  shams.js
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │      │  index.js
│  │      │  tests.js
│  │      │
│  │      └─shams
│  │              core-js.js
│  │              get-own-property-symbols.js
│  │
│  ├─has-tostringtag
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  shams.d.ts
│  │  │  shams.js
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │      │  index.js
│  │      │  tests.js
│  │      │
│  │      └─shams
│  │              core-js.js
│  │              get-own-property-symbols.js
│  │
│  ├─hasown
│  │  │  .eslintrc
│  │  │  .nycrc
│  │  │  CHANGELOG.md
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  tsconfig.json
│  │  │
│  │  └─.github
│  │          FUNDING.yml
│  │
│  ├─he
│  │  │  he.js
│  │  │  LICENSE-MIT.txt
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─bin
│  │  │      he
│  │  │
│  │  └─man
│  │          he.1
│  │
│  ├─jiti
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─dist
│  │  │      babel.cjs
│  │  │      jiti.cjs
│  │  │
│  │  └─lib
│  │          jiti-cli.mjs
│  │          jiti-hooks.mjs
│  │          jiti-native.mjs
│  │          jiti-register.d.mts
│  │          jiti-register.mjs
│  │          jiti.cjs
│  │          jiti.d.cts
│  │          jiti.d.mts
│  │          jiti.mjs
│  │          types.d.ts
│  │
│  ├─lightningcss
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─node
│  │          ast.d.ts
│  │          ast.js.flow
│  │          browserslistToTargets.js
│  │          composeVisitors.js
│  │          flags.js
│  │          index.d.ts
│  │          index.js
│  │          index.js.flow
│  │          index.mjs
│  │          targets.d.ts
│  │          targets.js.flow
│  │
│  ├─lightningcss-win32-x64-msvc
│  │      LICENSE
│  │      lightningcss.win32-x64-msvc.node
│  │      package.json
│  │      README.md
│  │
│  ├─linkify-it
│  │  │  index.mjs
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─build
│  │  │      index.cjs.js
│  │  │
│  │  └─lib
│  │          re.mjs
│  │
│  ├─magic-string
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─dist
│  │          magic-string.cjs.d.ts
│  │          magic-string.cjs.js
│  │          magic-string.cjs.js.map
│  │          magic-string.es.d.mts
│  │          magic-string.es.mjs
│  │          magic-string.es.mjs.map
│  │          magic-string.umd.js
│  │          magic-string.umd.js.map
│  │
│  ├─markdown-it
│  │  │  index.mjs
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─bin
│  │  │      markdown-it.mjs
│  │  │
│  │  ├─dist
│  │  │      index.cjs.js
│  │  │      markdown-it.js
│  │  │      markdown-it.min.js
│  │  │
│  │  └─lib
│  │      │  index.mjs
│  │      │  parser_block.mjs
│  │      │  parser_core.mjs
│  │      │  parser_inline.mjs
│  │      │  renderer.mjs
│  │      │  ruler.mjs
│  │      │  token.mjs
│  │      │
│  │      ├─common
│  │      │      html_blocks.mjs
│  │      │      html_re.mjs
│  │      │      utils.mjs
│  │      │
│  │      ├─helpers
│  │      │      index.mjs
│  │      │      parse_link_destination.mjs
│  │      │      parse_link_label.mjs
│  │      │      parse_link_title.mjs
│  │      │
│  │      ├─presets
│  │      │      commonmark.mjs
│  │      │      default.mjs
│  │      │      zero.mjs
│  │      │
│  │      ├─rules_block
│  │      │      blockquote.mjs
│  │      │      code.mjs
│  │      │      fence.mjs
│  │      │      heading.mjs
│  │      │      hr.mjs
│  │      │      html_block.mjs
│  │      │      lheading.mjs
│  │      │      list.mjs
│  │      │      paragraph.mjs
│  │      │      reference.mjs
│  │      │      state_block.mjs
│  │      │      table.mjs
│  │      │
│  │      ├─rules_core
│  │      │      block.mjs
│  │      │      inline.mjs
│  │      │      linkify.mjs
│  │      │      normalize.mjs
│  │      │      replacements.mjs
│  │      │      smartquotes.mjs
│  │      │      state_core.mjs
│  │      │      text_join.mjs
│  │      │
│  │      └─rules_inline
│  │              autolink.mjs
│  │              backticks.mjs
│  │              balance_pairs.mjs
│  │              emphasis.mjs
│  │              entity.mjs
│  │              escape.mjs
│  │              fragments_join.mjs
│  │              html_inline.mjs
│  │              image.mjs
│  │              link.mjs
│  │              linkify.mjs
│  │              newline.mjs
│  │              state_inline.mjs
│  │              strikethrough.mjs
│  │              text.mjs
│  │
│  ├─math-intrinsics
│  │  │  .eslintrc
│  │  │  abs.d.ts
│  │  │  abs.js
│  │  │  CHANGELOG.md
│  │  │  floor.d.ts
│  │  │  floor.js
│  │  │  isFinite.d.ts
│  │  │  isFinite.js
│  │  │  isInteger.d.ts
│  │  │  isInteger.js
│  │  │  isNaN.d.ts
│  │  │  isNaN.js
│  │  │  isNegativeZero.d.ts
│  │  │  isNegativeZero.js
│  │  │  LICENSE
│  │  │  max.d.ts
│  │  │  max.js
│  │  │  min.d.ts
│  │  │  min.js
│  │  │  mod.d.ts
│  │  │  mod.js
│  │  │  package.json
│  │  │  pow.d.ts
│  │  │  pow.js
│  │  │  README.md
│  │  │  round.d.ts
│  │  │  round.js
│  │  │  sign.d.ts
│  │  │  sign.js
│  │  │  tsconfig.json
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  ├─constants
│  │  │      maxArrayLength.d.ts
│  │  │      maxArrayLength.js
│  │  │      maxSafeInteger.d.ts
│  │  │      maxSafeInteger.js
│  │  │      maxValue.d.ts
│  │  │      maxValue.js
│  │  │
│  │  └─test
│  │          index.js
│  │
│  ├─mdurl
│  │  │  index.mjs
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─build
│  │  │      index.cjs.js
│  │  │
│  │  └─lib
│  │          decode.mjs
│  │          encode.mjs
│  │          format.mjs
│  │          parse.mjs
│  │
│  ├─mime-db
│  │      db.json
│  │      HISTORY.md
│  │      index.js
│  │      LICENSE
│  │      package.json
│  │      README.md
│  │
│  ├─mime-types
│  │      HISTORY.md
│  │      index.js
│  │      LICENSE
│  │      package.json
│  │      README.md
│  │
│  ├─minimatch
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─dist
│  │      ├─commonjs
│  │      │      assert-valid-pattern.d.ts
│  │      │      assert-valid-pattern.d.ts.map
│  │      │      assert-valid-pattern.js
│  │      │      assert-valid-pattern.js.map
│  │      │      ast.d.ts
│  │      │      ast.d.ts.map
│  │      │      ast.js
│  │      │      ast.js.map
│  │      │      brace-expressions.d.ts
│  │      │      brace-expressions.d.ts.map
│  │      │      brace-expressions.js
│  │      │      brace-expressions.js.map
│  │      │      escape.d.ts
│  │      │      escape.d.ts.map
│  │      │      escape.js
│  │      │      escape.js.map
│  │      │      index.d.ts
│  │      │      index.d.ts.map
│  │      │      index.js
│  │      │      index.js.map
│  │      │      package.json
│  │      │      unescape.d.ts
│  │      │      unescape.d.ts.map
│  │      │      unescape.js
│  │      │      unescape.js.map
│  │      │
│  │      └─esm
│  │              assert-valid-pattern.d.ts
│  │              assert-valid-pattern.d.ts.map
│  │              assert-valid-pattern.js
│  │              assert-valid-pattern.js.map
│  │              ast.d.ts
│  │              ast.d.ts.map
│  │              ast.js
│  │              ast.js.map
│  │              brace-expressions.d.ts
│  │              brace-expressions.d.ts.map
│  │              brace-expressions.js
│  │              brace-expressions.js.map
│  │              escape.d.ts
│  │              escape.d.ts.map
│  │              escape.js
│  │              escape.js.map
│  │              index.d.ts
│  │              index.d.ts.map
│  │              index.js
│  │              index.js.map
│  │              package.json
│  │              unescape.d.ts
│  │              unescape.d.ts.map
│  │              unescape.js
│  │              unescape.js.map
│  │
│  ├─muggle-string
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─out
│  │          base.d.ts
│  │          base.js
│  │          basic.d.ts
│  │          basic.js
│  │          binarySearch.d.ts
│  │          binarySearch.js
│  │          common.d.ts
│  │          common.js
│  │          getLength.d.ts
│  │          getLength.js
│  │          index.d.ts
│  │          index.js
│  │          map.d.ts
│  │          map.js
│  │          overwriteSource.d.ts
│  │          overwriteSource.js
│  │          replace.d.ts
│  │          replace.js
│  │          segment.d.ts
│  │          segment.js
│  │          sourceBased.d.ts
│  │          sourceBased.js
│  │          toString.d.ts
│  │          toString.js
│  │          track.d.ts
│  │          track.js
│  │          types.d.ts
│  │          types.js
│  │
│  ├─nanoid
│  │  │  .devcontainer.json
│  │  │  index.browser.cjs
│  │  │  index.browser.js
│  │  │  index.cjs
│  │  │  index.d.cts
│  │  │  index.d.ts
│  │  │  index.js
│  │  │  LICENSE
│  │  │  nanoid.js
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─async
│  │  │      index.browser.cjs
│  │  │      index.browser.js
│  │  │      index.cjs
│  │  │      index.d.ts
│  │  │      index.js
│  │  │      index.native.js
│  │  │      package.json
│  │  │
│  │  ├─bin
│  │  │      nanoid.cjs
│  │  │
│  │  ├─non-secure
│  │  │      index.cjs
│  │  │      index.d.ts
│  │  │      index.js
│  │  │      package.json
│  │  │
│  │  └─url-alphabet
│  │          index.cjs
│  │          index.js
│  │          package.json
│  │
│  ├─node-releases
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─data
│  │      ├─processed
│  │      │      envs.json
│  │      │
│  │      └─release-schedule
│  │              release-schedule.json
│  │
│  ├─normalize-range
│  │      index.js
│  │      license
│  │      package.json
│  │      readme.md
│  │
│  ├─path-browserify
│  │  │  .travis.yml
│  │  │  CHANGELOG.md
│  │  │  index.js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  security.md
│  │  │
│  │  ├─.github
│  │  │      FUNDING.yml
│  │  │
│  │  └─test
│  │          index.js
│  │          test-path-basename.js
│  │          test-path-dirname.js
│  │          test-path-extname.js
│  │          test-path-isabsolute.js
│  │          test-path-join.js
│  │          test-path-parse-format.js
│  │          test-path-relative.js
│  │          test-path-resolve.js
│  │          test-path-zero-length-strings.js
│  │          test-path.js
│  │
│  ├─picocolors
│  │      LICENSE
│  │      package.json
│  │      picocolors.browser.js
│  │      picocolors.d.ts
│  │      picocolors.js
│  │      README.md
│  │      types.d.ts
│  │
│  ├─postcss
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─lib
│  │          at-rule.d.ts
│  │          at-rule.js
│  │          comment.d.ts
│  │          comment.js
│  │          container.d.ts
│  │          container.js
│  │          css-syntax-error.d.ts
│  │          css-syntax-error.js
│  │          declaration.d.ts
│  │          declaration.js
│  │          document.d.ts
│  │          document.js
│  │          fromJSON.d.ts
│  │          fromJSON.js
│  │          input.d.ts
│  │          input.js
│  │          lazy-result.d.ts
│  │          lazy-result.js
│  │          list.d.ts
│  │          list.js
│  │          map-generator.js
│  │          no-work-result.d.ts
│  │          no-work-result.js
│  │          node.d.ts
│  │          node.js
│  │          parse.d.ts
│  │          parse.js
│  │          parser.js
│  │          postcss.d.mts
│  │          postcss.d.ts
│  │          postcss.js
│  │          postcss.mjs
│  │          previous-map.d.ts
│  │          previous-map.js
│  │          processor.d.ts
│  │          processor.js
│  │          result.d.ts
│  │          result.js
│  │          root.d.ts
│  │          root.js
│  │          rule.d.ts
│  │          rule.js
│  │          stringifier.d.ts
│  │          stringifier.js
│  │          stringify.d.ts
│  │          stringify.js
│  │          symbols.js
│  │          terminal-highlight.js
│  │          tokenize.js
│  │          warn-once.js
│  │          warning.d.ts
│  │          warning.js
│  │
│  ├─postcss-value-parser
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─lib
│  │          index.d.ts
│  │          index.js
│  │          parse.js
│  │          stringify.js
│  │          unit.js
│  │          walk.js
│  │
│  ├─punycode.js
│  │      LICENSE-MIT.txt
│  │      package.json
│  │      punycode.es6.js
│  │      punycode.js
│  │      README.md
│  │
│  ├─rollup
│  │  │  LICENSE.md
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  └─dist
│  │      │  getLogFilter.d.ts
│  │      │  getLogFilter.js
│  │      │  loadConfigFile.d.ts
│  │      │  loadConfigFile.js
│  │      │  native.js
│  │      │  parseAst.d.ts
│  │      │  parseAst.js
│  │      │  rollup.d.ts
│  │      │  rollup.js
│  │      │
│  │      ├─bin
│  │      │      rollup
│  │      │
│  │      ├─es
│  │      │  │  getLogFilter.js
│  │      │  │  package.json
│  │      │  │  parseAst.js
│  │      │  │  rollup.js
│  │      │  │
│  │      │  └─shared
│  │      │          node-entry.js
│  │      │          parseAst.js
│  │      │          watch.js
│  │      │
│  │      └─shared
│  │              fsevents-importer.js
│  │              index.js
│  │              loadConfigFile.js
│  │              parseAst.js
│  │              rollup.js
│  │              watch-cli.js
│  │              watch.js
│  │
│  ├─source-map-js
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  source-map.d.ts
│  │  │  source-map.js
│  │  │
│  │  └─lib
│  │          array-set.js
│  │          base64-vlq.js
│  │          base64.js
│  │          binary-search.js
│  │          mapping-list.js
│  │          quick-sort.js
│  │          source-map-consumer.d.ts
│  │          source-map-consumer.js
│  │          source-map-generator.d.ts
│  │          source-map-generator.js
│  │          source-node.d.ts
│  │          source-node.js
│  │          util.js
│  │
│  ├─tailwindcss
│  │  │  index.css
│  │  │  LICENSE
│  │  │  package.json
│  │  │  preflight.css
│  │  │  README.md
│  │  │  theme.css
│  │  │  utilities.css
│  │  │
│  │  └─dist
│  │          chunk-AZANAYY2.mjs
│  │          chunk-V2K3XTS4.mjs
│  │          chunk-ZH25KTLC.mjs
│  │          colors-b_6i0Oi7.d.ts
│  │          colors.d.mts
│  │          colors.d.ts
│  │          colors.js
│  │          colors.mjs
│  │          default-theme.d.mts
│  │          default-theme.d.ts
│  │          default-theme.js
│  │          default-theme.mjs
│  │          flatten-color-palette.d.mts
│  │          flatten-color-palette.d.ts
│  │          flatten-color-palette.js
│  │          flatten-color-palette.mjs
│  │          lib.d.mts
│  │          lib.d.ts
│  │          lib.js
│  │          lib.mjs
│  │          plugin.d.mts
│  │          plugin.d.ts
│  │          plugin.js
│  │          plugin.mjs
│  │          resolve-config-BIFUA2FY.d.ts
│  │          resolve-config-QUZ9b-Gn.d.mts
│  │          types-B254mqw1.d.mts
│  │
│  ├─tapable
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │  tapable.d.ts
│  │  │
│  │  └─lib
│  │          AsyncParallelBailHook.js
│  │          AsyncParallelHook.js
│  │          AsyncSeriesBailHook.js
│  │          AsyncSeriesHook.js
│  │          AsyncSeriesLoopHook.js
│  │          AsyncSeriesWaterfallHook.js
│  │          Hook.js
│  │          HookCodeFactory.js
│  │          HookMap.js
│  │          index.js
│  │          MultiHook.js
│  │          SyncBailHook.js
│  │          SyncHook.js
│  │          SyncLoopHook.js
│  │          SyncWaterfallHook.js
│  │          util-browser.js
│  │
│  ├─typescript
│  │  │  LICENSE.txt
│  │  │  package.json
│  │  │  README.md
│  │  │  SECURITY.md
│  │  │  ThirdPartyNoticeText.txt
│  │  │
│  │  ├─bin
│  │  │      tsc
│  │  │      tsserver
│  │  │
│  │  └─lib
│  │      │  cancellationToken.js
│  │      │  lib.d.ts
│  │      │  lib.decorators.d.ts
│  │      │  lib.decorators.legacy.d.ts
│  │      │  lib.dom.asynciterable.d.ts
│  │      │  lib.dom.d.ts
│  │      │  lib.dom.iterable.d.ts
│  │      │  lib.es2015.collection.d.ts
│  │      │  lib.es2015.core.d.ts
│  │      │  lib.es2015.d.ts
│  │      │  lib.es2015.generator.d.ts
│  │      │  lib.es2015.iterable.d.ts
│  │      │  lib.es2015.promise.d.ts
│  │      │  lib.es2015.proxy.d.ts
│  │      │  lib.es2015.reflect.d.ts
│  │      │  lib.es2015.symbol.d.ts
│  │      │  lib.es2015.symbol.wellknown.d.ts
│  │      │  lib.es2016.array.include.d.ts
│  │      │  lib.es2016.d.ts
│  │      │  lib.es2016.full.d.ts
│  │      │  lib.es2016.intl.d.ts
│  │      │  lib.es2017.arraybuffer.d.ts
│  │      │  lib.es2017.d.ts
│  │      │  lib.es2017.date.d.ts
│  │      │  lib.es2017.full.d.ts
│  │      │  lib.es2017.intl.d.ts
│  │      │  lib.es2017.object.d.ts
│  │      │  lib.es2017.sharedmemory.d.ts
│  │      │  lib.es2017.string.d.ts
│  │      │  lib.es2017.typedarrays.d.ts
│  │      │  lib.es2018.asyncgenerator.d.ts
│  │      │  lib.es2018.asynciterable.d.ts
│  │      │  lib.es2018.d.ts
│  │      │  lib.es2018.full.d.ts
│  │      │  lib.es2018.intl.d.ts
│  │      │  lib.es2018.promise.d.ts
│  │      │  lib.es2018.regexp.d.ts
│  │      │  lib.es2019.array.d.ts
│  │      │  lib.es2019.d.ts
│  │      │  lib.es2019.full.d.ts
│  │      │  lib.es2019.intl.d.ts
│  │      │  lib.es2019.object.d.ts
│  │      │  lib.es2019.string.d.ts
│  │      │  lib.es2019.symbol.d.ts
│  │      │  lib.es2020.bigint.d.ts
│  │      │  lib.es2020.d.ts
│  │      │  lib.es2020.date.d.ts
│  │      │  lib.es2020.full.d.ts
│  │      │  lib.es2020.intl.d.ts
│  │      │  lib.es2020.number.d.ts
│  │      │  lib.es2020.promise.d.ts
│  │      │  lib.es2020.sharedmemory.d.ts
│  │      │  lib.es2020.string.d.ts
│  │      │  lib.es2020.symbol.wellknown.d.ts
│  │      │  lib.es2021.d.ts
│  │      │  lib.es2021.full.d.ts
│  │      │  lib.es2021.intl.d.ts
│  │      │  lib.es2021.promise.d.ts
│  │      │  lib.es2021.string.d.ts
│  │      │  lib.es2021.weakref.d.ts
│  │      │  lib.es2022.array.d.ts
│  │      │  lib.es2022.d.ts
│  │      │  lib.es2022.error.d.ts
│  │      │  lib.es2022.full.d.ts
│  │      │  lib.es2022.intl.d.ts
│  │      │  lib.es2022.object.d.ts
│  │      │  lib.es2022.regexp.d.ts
│  │      │  lib.es2022.string.d.ts
│  │      │  lib.es2023.array.d.ts
│  │      │  lib.es2023.collection.d.ts
│  │      │  lib.es2023.d.ts
│  │      │  lib.es2023.full.d.ts
│  │      │  lib.es2023.intl.d.ts
│  │      │  lib.es2024.arraybuffer.d.ts
│  │      │  lib.es2024.collection.d.ts
│  │      │  lib.es2024.d.ts
│  │      │  lib.es2024.full.d.ts
│  │      │  lib.es2024.object.d.ts
│  │      │  lib.es2024.promise.d.ts
│  │      │  lib.es2024.regexp.d.ts
│  │      │  lib.es2024.sharedmemory.d.ts
│  │      │  lib.es2024.string.d.ts
│  │      │  lib.es5.d.ts
│  │      │  lib.es6.d.ts
│  │      │  lib.esnext.array.d.ts
│  │      │  lib.esnext.collection.d.ts
│  │      │  lib.esnext.d.ts
│  │      │  lib.esnext.decorators.d.ts
│  │      │  lib.esnext.disposable.d.ts
│  │      │  lib.esnext.full.d.ts
│  │      │  lib.esnext.intl.d.ts
│  │      │  lib.esnext.iterator.d.ts
│  │      │  lib.scripthost.d.ts
│  │      │  lib.webworker.asynciterable.d.ts
│  │      │  lib.webworker.d.ts
│  │      │  lib.webworker.importscripts.d.ts
│  │      │  lib.webworker.iterable.d.ts
│  │      │  tsc.js
│  │      │  tsserver.js
│  │      │  tsserverlibrary.d.ts
│  │      │  tsserverlibrary.js
│  │      │  typescript.d.ts
│  │      │  typescript.js
│  │      │  typesMap.json
│  │      │  typingsInstaller.js
│  │      │  watchGuard.js
│  │      │  _tsc.js
│  │      │  _tsserver.js
│  │      │  _typingsInstaller.js
│  │      │
│  │      ├─cs
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─de
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─es
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─fr
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─it
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─ja
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─ko
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─pl
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─pt-br
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─ru
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─tr
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      ├─zh-cn
│  │      │      diagnosticMessages.generated.json
│  │      │
│  │      └─zh-tw
│  │              diagnosticMessages.generated.json
│  │
│  ├─uc.micro
│  │  │  index.mjs
│  │  │  LICENSE.txt
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─build
│  │  │      index.cjs.js
│  │  │
│  │  ├─categories
│  │  │  ├─Cc
│  │  │  │      regex.mjs
│  │  │  │
│  │  │  ├─Cf
│  │  │  │      regex.mjs
│  │  │  │
│  │  │  ├─P
│  │  │  │      regex.mjs
│  │  │  │
│  │  │  ├─S
│  │  │  │      regex.mjs
│  │  │  │
│  │  │  └─Z
│  │  │          regex.mjs
│  │  │
│  │  └─properties
│  │      └─Any
│  │              regex.mjs
│  │
│  ├─update-browserslist-db
│  │      check-npm-version.js
│  │      cli.js
│  │      index.d.ts
│  │      index.js
│  │      LICENSE
│  │      package.json
│  │      README.md
│  │      utils.js
│  │
│  ├─vite
│  │  │  client.d.ts
│  │  │  index.cjs
│  │  │  index.d.cts
│  │  │  LICENSE.md
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─bin
│  │  │      openChrome.applescript
│  │  │      vite.js
│  │  │
│  │  ├─dist
│  │  │  ├─client
│  │  │  │      client.mjs
│  │  │  │      env.mjs
│  │  │  │
│  │  │  ├─node
│  │  │  │  │  cli.js
│  │  │  │  │  constants.js
│  │  │  │  │  index.d.ts
│  │  │  │  │  index.js
│  │  │  │  │  module-runner.d.ts
│  │  │  │  │  module-runner.js
│  │  │  │  │  moduleRunnerTransport.d-CXw_Ws6P.d.ts
│  │  │  │  │
│  │  │  │  └─chunks
│  │  │  │          dep-3RmXg9uo.js
│  │  │  │          dep-B42HB7IL.js
│  │  │  │          dep-Cg8OuIew.js
│  │  │  │          dep-CJRd4GTw.js
│  │  │  │          dep-DcIXjcop.js
│  │  │  │
│  │  │  └─node-cjs
│  │  │          publicUtils.cjs
│  │  │
│  │  ├─misc
│  │  │      false.js
│  │  │      true.js
│  │  │
│  │  └─types
│  │      │  customEvent.d.ts
│  │      │  hmrPayload.d.ts
│  │      │  hot.d.ts
│  │      │  import-meta.d.ts
│  │      │  importGlob.d.ts
│  │      │  importMeta.d.ts
│  │      │  metadata.d.ts
│  │      │  package.json
│  │      │
│  │      └─internal
│  │              cssPreprocessorOptions.d.ts
│  │              lightningcssOptions.d.ts
│  │
│  ├─vscode-uri
│  │  │  LICENSE.md
│  │  │  package.json
│  │  │  README.md
│  │  │  SECURITY.md
│  │  │
│  │  └─lib
│  │      ├─esm
│  │      │      index.mjs
│  │      │      index.mjs.map
│  │      │
│  │      └─umd
│  │              charCode.d.ts
│  │              charCode.js
│  │              index.d.ts
│  │              index.js
│  │              index.js.map
│  │              platform.d.ts
│  │              platform.js
│  │              uri.d.ts
│  │              uri.js
│  │              utils.d.ts
│  │              utils.js
│  │
│  ├─vue
│  │  │  index.js
│  │  │  index.mjs
│  │  │  jsx.d.ts
│  │  │  LICENSE
│  │  │  package.json
│  │  │  README.md
│  │  │
│  │  ├─compiler-sfc
│  │  │      index.browser.js
│  │  │      index.browser.mjs
│  │  │      index.d.mts
│  │  │      index.d.ts
│  │  │      index.js
│  │  │      index.mjs
│  │  │      package.json
│  │  │      register-ts.js
│  │  │
│  │  ├─dist
│  │  │      vue.cjs.js
│  │  │      vue.cjs.prod.js
│  │  │      vue.d.mts
│  │  │      vue.d.ts
│  │  │      vue.esm-browser.js
│  │  │      vue.esm-browser.prod.js
│  │  │      vue.esm-bundler.js
│  │  │      vue.global.js
│  │  │      vue.global.prod.js
│  │  │      vue.runtime.esm-browser.js
│  │  │      vue.runtime.esm-browser.prod.js
│  │  │      vue.runtime.esm-bundler.js
│  │  │      vue.runtime.global.js
│  │  │      vue.runtime.global.prod.js
│  │  │
│  │  ├─jsx-runtime
│  │  │      index.d.ts
│  │  │      index.js
│  │  │      index.mjs
│  │  │      package.json
│  │  │
│  │  └─server-renderer
│  │          index.d.mts
│  │          index.d.ts
│  │          index.js
│  │          index.mjs
│  │          package.json
│  │
│  ├─vue-markdown-render
│  │  │  LICENSE.md
│  │  │  package.json
│  │  │  README.md
│  │  │  tsconfig.json
│  │  │
│  │  ├─dist
│  │  │      VueMarkdown.d.ts
│  │  │      VueMarkdown.js
│  │  │      VueMarkdown.js.map
│  │  │
│  │  ├─example
│  │  │  │  index.html
│  │  │  │  package.json
│  │  │  │  pnpm-lock.yaml
│  │  │  │  README.md
│  │  │  │  tsconfig.json
│  │  │  │  vite.config.ts
│  │  │  │
│  │  │  ├─public
│  │  │  │      favicon.ico
│  │  │  │
│  │  │  └─src
│  │  │      │  App.vue
│  │  │      │  env.d.ts
│  │  │      │  main.ts
│  │  │      │
│  │  │      ├─assets
│  │  │      │      logo.png
│  │  │      │
│  │  │      └─components
│  │  │              HelloWorld.vue
│  │  │
│  │  ├─node_modules
│  │  │  ├─.bin
│  │  │  │      markdown-it
│  │  │  │      markdown-it.cmd
│  │  │  │      markdown-it.ps1
│  │  │  │
│  │  │  ├─entities
│  │  │  │  │  LICENSE
│  │  │  │  │  package.json
│  │  │  │  │  readme.md
│  │  │  │  │
│  │  │  │  └─lib
│  │  │  │      │  decode.d.ts
│  │  │  │      │  decode.d.ts.map
│  │  │  │      │  decode.js
│  │  │  │      │  decode_codepoint.d.ts
│  │  │  │      │  decode_codepoint.d.ts.map
│  │  │  │      │  decode_codepoint.js
│  │  │  │      │  encode-trie.d.ts
│  │  │  │      │  encode-trie.d.ts.map
│  │  │  │      │  encode-trie.js
│  │  │  │      │  encode.d.ts
│  │  │  │      │  encode.d.ts.map
│  │  │  │      │  encode.js
│  │  │  │      │  index.d.ts
│  │  │  │      │  index.d.ts.map
│  │  │  │      │  index.js
│  │  │  │      │
│  │  │  │      ├─generated
│  │  │  │      │      decode-data-html.d.ts
│  │  │  │      │      decode-data-html.d.ts.map
│  │  │  │      │      decode-data-html.js
│  │  │  │      │      decode-data-xml.d.ts
│  │  │  │      │      decode-data-xml.d.ts.map
│  │  │  │      │      decode-data-xml.js
│  │  │  │      │
│  │  │  │      └─maps
│  │  │  │              entities.json
│  │  │  │              legacy.json
│  │  │  │              xml.json
│  │  │  │
│  │  │  ├─linkify-it
│  │  │  │  │  index.js
│  │  │  │  │  LICENSE
│  │  │  │  │  package.json
│  │  │  │  │  README.md
│  │  │  │  │
│  │  │  │  └─lib
│  │  │  │          re.js
│  │  │  │
│  │  │  ├─markdown-it
│  │  │  │  │  index.js
│  │  │  │  │  LICENSE
│  │  │  │  │  package.json
│  │  │  │  │  README.md
│  │  │  │  │
│  │  │  │  ├─bin
│  │  │  │  │      markdown-it.js
│  │  │  │  │
│  │  │  │  ├─dist
│  │  │  │  │      markdown-it.js
│  │  │  │  │      markdown-it.min.js
│  │  │  │  │
│  │  │  │  └─lib
│  │  │  │      │  index.js
│  │  │  │      │  parser_block.js
│  │  │  │      │  parser_core.js
│  │  │  │      │  parser_inline.js
│  │  │  │      │  renderer.js
│  │  │  │      │  ruler.js
│  │  │  │      │  token.js
│  │  │  │      │
│  │  │  │      ├─common
│  │  │  │      │      entities.js
│  │  │  │      │      html_blocks.js
│  │  │  │      │      html_re.js
│  │  │  │      │      utils.js
│  │  │  │      │
│  │  │  │      ├─helpers
│  │  │  │      │      index.js
│  │  │  │      │      parse_link_destination.js
│  │  │  │      │      parse_link_label.js
│  │  │  │      │      parse_link_title.js
│  │  │  │      │
│  │  │  │      ├─presets
│  │  │  │      │      commonmark.js
│  │  │  │      │      default.js
│  │  │  │      │      zero.js
│  │  │  │      │
│  │  │  │      ├─rules_block
│  │  │  │      │      blockquote.js
│  │  │  │      │      code.js
│  │  │  │      │      fence.js
│  │  │  │      │      heading.js
│  │  │  │      │      hr.js
│  │  │  │      │      html_block.js
│  │  │  │      │      lheading.js
│  │  │  │      │      list.js
│  │  │  │      │      paragraph.js
│  │  │  │      │      reference.js
│  │  │  │      │      state_block.js
│  │  │  │      │      table.js
│  │  │  │      │
│  │  │  │      ├─rules_core
│  │  │  │      │      block.js
│  │  │  │      │      inline.js
│  │  │  │      │      linkify.js
│  │  │  │      │      normalize.js
│  │  │  │      │      replacements.js
│  │  │  │      │      smartquotes.js
│  │  │  │      │      state_core.js
│  │  │  │      │      text_join.js
│  │  │  │      │
│  │  │  │      └─rules_inline
│  │  │  │              autolink.js
│  │  │  │              backticks.js
│  │  │  │              balance_pairs.js
│  │  │  │              emphasis.js
│  │  │  │              entity.js
│  │  │  │              escape.js
│  │  │  │              fragments_join.js
│  │  │  │              html_inline.js
│  │  │  │              image.js
│  │  │  │              link.js
│  │  │  │              linkify.js
│  │  │  │              newline.js
│  │  │  │              state_inline.js
│  │  │  │              strikethrough.js
│  │  │  │              text.js
│  │  │  │
│  │  │  ├─mdurl
│  │  │  │      CHANGELOG.md
│  │  │  │      decode.js
│  │  │  │      encode.js
│  │  │  │      format.js
│  │  │  │      index.js
│  │  │  │      LICENSE
│  │  │  │      package.json
│  │  │  │      parse.js
│  │  │  │      README.md
│  │  │  │
│  │  │  └─uc.micro
│  │  │      │  CHANGELOG.md
│  │  │      │  index.js
│  │  │      │  LICENSE.txt
│  │  │      │  package.json
│  │  │      │  README.md
│  │  │      │
│  │  │      ├─categories
│  │  │      │  ├─Cc
│  │  │      │  │      regex.js
│  │  │      │  │
│  │  │      │  ├─Cf
│  │  │      │  │      regex.js
│  │  │      │  │
│  │  │      │  ├─P
│  │  │      │  │      regex.js
│  │  │      │  │
│  │  │      │  └─Z
│  │  │      │          regex.js
│  │  │      │
│  │  │      └─properties
│  │  │          └─Any
│  │  │                  regex.js
│  │  │
│  │  └─src
│  │          VueMarkdown.ts
│  │
│  └─vue-tsc
│      │  index.d.ts
│      │  index.js
│      │  LICENSE
│      │  package.json
│      │  README.md
│      │
│      └─bin
│              vue-tsc.js
│
└─src
    │  App.vue
    │  main.ts
    │  style.css
    │  vite-env.d.ts
    │
    ├─components
    │  │  Inline.vue
    │  │  Search.vue
    │  │
    │  ├─src
    │  │      dialogBox.vue
    │  │      inputBox.vue
    │  │      ModelSetting.vue
    │  │      ModelSwitch.vue
    │  │      Prompt.vue
    │  │
    │  └─web
    │      │  Web.vue
    │      │
    │      └─components
    │              favorite.vue
    │              history.vue
    │
    ├─model
    │      Message.ts
    │      Model.ts
    │      Prompt.ts
    │      Tab.ts
    │
    └─services
            aiService.ts





