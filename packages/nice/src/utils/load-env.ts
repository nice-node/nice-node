/**
 * 工程启动时加载 dotenv 中的环境变量，尽早引用该文件，以便后续的代码中能获取到环境变量。
 * 注意：
 * 1. 该文件不能引用 debug ，否则会导致 process.env.DEBUG 设置无效
 * 2. 该文件不能引用 utils(或者引用 debug 的第三方包)
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';
import _ from 'lodash';
import glob from 'glob';

const { NODE_ENV } = process.env;

/**
 * 获取 `profiles` 目录下的对应的 `env` 文件绝对路径
 * @param type profile 类型
 * @returns 对应的 `env` 文件绝对路径
 */
const getEnvAbsolutePath: (type: string) => string[] = (type: string) => {
  // 加载 `profiles` 目录下的对应的 `env` 文件
  const globOptions = { absolute: true };
  return glob.sync(`profiles/${type}/**/*.env`, globOptions);
};

/**
 * 获取 `profiles` 目录下的对应的 `env` 文件中包含的所有配置的 `key` 值
 * @param type `env` 类型
 * @returns `env` 文件中包含的所有配置的 `key` 值
 */
const getKeys: (type: string) => (string | ConcatArray<string>)[] = (type: string) => {
  const dotenvFiles = getEnvAbsolutePath(type);
  return _.union(_.flattenDeep(dotenvFiles.map((dotenvFile) => {
    const content = readFileSync(dotenvFile, 'utf-8');
    return Object.keys(dotenv.parse(content));
  })));
};

const checkEnv: () => string[] = () => {
  const profileKeys = getKeys(NODE_ENV);
  const defaultKeys = getKeys('default');
  const foundKeys = [];
  profileKeys.forEach((key) => {
    if (!defaultKeys.includes(key)) {
      foundKeys.push(key);
    }
  });

  return foundKeys;
};

/**
 * 加载 `profiles` 目录下的对应的 `env` 文件
 * @param type
 */
const loadEnv = (type: string) => {
  const dotenvFiles = getEnvAbsolutePath(type);
  dotenvFiles.forEach((dotenvFile) => {
    console.log(`正在加载配置文件：${dotenvFile}`);
    dotenv.config({
      path: dotenvFile
    });
  });
};


export default () => {
  // 加载工程根目录下的 `.env` 文件
  dotenv.config();

  // 不存在 NODE_ENV 时强制退出程序
  if (!('NODE_ENV' in process.env)) {
    console.warn('[启动失败]未找到必要的环境变量 `NODE_ENV` ，请尝试以下方法：');
    console.warn('  * 运行 `npm run env:{NODE_ENV}` 创建 .env 文件');
    console.warn('  * 启动程序时加上环境变量 `NODE_ENV={NODE_ENV}`');
    process.exit(1);
  }

  const errorKeys = checkEnv();
  if (errorKeys.length === 0) {
    loadEnv(NODE_ENV);
    loadEnv('default');
  } else {
    const directory = resolve('profiles/default');
    const error = `默认配置(${directory})中没找到配置项：'${errorKeys.join(', ')}'`;
    throw new Error(error);
  }
};
