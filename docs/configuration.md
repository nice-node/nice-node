---
id: configuration
title: 配置和环境变量
---

Nice-node 内置的各种功能可以在创建 nice-node 实例时通过参数来控制，这个我们在前面的例子中已经看到过了，例如，下面是创建一个支持自动注册路由的应用

```js
const app = new NiceNode({
  requireAllRoutes: {
    enable: true
  }
});
```

内置的功能还可以通过环境变量来控制，下面的方式也能启用自动注册路由功能：
1. 创建应用时不加参数
  ```js
  const app = new NiceNode();
  ```
1. 启动服务时加环境变量
  ```
  REQUIRE_ALL_ROUTES_ENABLE=true npm start
  ```

这种方式虽然灵活多变，但容易出错，在大部分的开发过程中，我们会选择使用 [dotenv](https://www.npmjs.com/package/dotenv) 来辅助完成环境变量的传递。

Nice-node 内部的默认配置 [nicenode.env](https://github.com/zhongzhi107/nice-node/blob/master/packages/nice-node/nicenode.env) 也是使用 dotenv 来实现的，这些参数都可以通过命令行传参的方式来修改。

再说说加载顺序：
1. 命令行中传入的环境变量优先级最高。
1. 其次加载 `{PROFILE}` 下的所有 `.env` 文件。
1. 最后加载 `node_modules/nice-node/nicenode.env`。

启动时可以加载多个配置文件，当配置项存在冲突时，以先加载的配置为准。

dotenv 文件规则：
- 井号(#)开头的行被视为注释
- 忽略空行
- 格式： `key=value`
- key命名规范：大写字母 + 下划线(\_)
- 空值会转换为空字符串: `EMPTY=` => `{EMPTY: ''}`
- 值前后空格会去掉，不希望被去掉的话，对值前后加引号
- **返回值均为字符串，代码中需要做逻辑判断时，需要做字符串比较**
- 递归加载目录中所有 `.env` 文件
- 为了避免多文件间 key 名称冲突，建议 key 命名时以 `{文件名}_` 开头
