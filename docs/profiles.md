---
id: profiles
title: profiles
---

在开发过程中经常会遇到代码需要在不同的环境下某些变量的值是不同的，比如某些请求地址、debug 开关等。为了解决这类问题， nice-node 提供了类似 maven 中的 profiles 功能。

>profile可以让我们定义一系列的配置信息，然后指定其激活条件，这样我们就可以定义多个profile，然后每个 profile 对应不同的激活条件和配置信息，从而达到不同环境使用不同配置信息的效果。

下面我们动手来创建一个 profile 变量。

1. 在 `profiles/local` 新建文件 `app.env` ，并写入下面的内容：
  ```
  # 是否打开调试开关
  DEBUG=true

  # 请求网址
  URL=http://localhost
  ```
1. 在 `profiles/prod` 新建文件 `app.env` ，并写入下面的内容：
  ```
  # 是否打开调试开关
  DEBUG=false

  # 请求网址
  URL=http://www.baidu.com
  ```
1. 创建 `src/routes/profile.ts` 路由文件：
  ```js
  // src/routes/profile.ts
  import Koa from 'koa';
  import Router from 'koa-router';

  const router = new Router();
  router.get('/profile', async (ctx: Koa.Context) => {
    const { DEBUG, URL } = process.env;

    if (DEBUG === 'true') {
      console.log('This is a debug log.');
    }
    ctx.body = URL;
  });

  export default router.routes();
  ```
1. 修改 `src/index.ts`。
  ```js
  // src/index.ts
  import Koa from 'koa';
  import NiceNode from 'nice-node';

  const { PORT } = process.env;

  const app = new NiceNode({
    requireAllRoutes: {
      enable: true
    }
  });
  app.server.listen(PORT, () => {
    console.log(`\n🚀 http://localhost:${PORT}`);
  });
  ```

1. 使用 `PROFILE=local npm start` 启动服务，启动成功后访问 `http://localhost:3000/profile` ，能看到
  - 网页内容为 `http://localhost`
  - 控制台上有日志输出 `This is a debug log.`
1. 使用 `PROFILE=prod npm start` 启动服务，启动成功后访问 `http://localhost:3000/profile` ，能看到
  - 网页内容为 `http://www.baidu.com`
  - 控制台上无日志输出

本实例通过指定 `PROFILE=local` 和 `PROFILE=prod` 使用了不同的配置文件，下面，让我们来了解更多关于 profiles 的知识。

Profiles 配置文件是存放在 `profiles` 目录（或子目录）下的 `*.env` 文件。初始项目包含三种环境：
- `local`： 本地环境
- `beta`：测试环境
- `prod`：线上环境

`profiles` 目录能看到，其实就是三个子目录，你可根据实际情况创建属于自己的 profile ，如多个测试环境使用不同的配置，可以创建 `betaA` `betaB` 等，发布时修改发布系统的 `profileId` 为需要的环境即可。

![profileId](https://m.qunar.com/zhuanti/profiles-1.jpg)

使用环境变量 `PROFILE` 来激活对应的 profile ，有两种方式传入环境变量：
- 程序启动命令中指定。（本地开发推荐用这种方式）
  ```
  PROFILE=local npm start
  ```
- 使用 [dotenv](https://www.npmjs.com/package/dotenv) 传递。在项目根目录创建 `.env` 文件，程序启动时会加载该文件。（beta和线上用的是这种方式）
  ```
  # .env
  PROFILE=local
  ```
