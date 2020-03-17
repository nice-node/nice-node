---
id: util-ecosystem-config
title: ecosystem-config
---

nice-node 内置了一份 tsconfig.json

```json
// nice-node 内置的 tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "declaration": true,
    "removeComments": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./src",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 用法

建议项目中的 tsconfig.json 从 nice-node 内置的文件中继承，由于配置中的路径都是相对于原始 json 文件的，所以继承后需要重新覆盖所有和路径相关的参数，其他参数也可以根据实际情况覆盖或者新增。

```json
// 使用继承和覆盖的 tsconfig.json
{
  "extends": "./node_modules/nice-node/tsconfig.json",
  "compilerOptions": {
    "declaration": false,
    "sourceMap": false,
    "outDir": "./dist",
    "baseUrl": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```
