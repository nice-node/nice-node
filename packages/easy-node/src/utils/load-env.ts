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

const easyNodeEnvPath = resolve(__dirname, '../../easynode.env');

/**
 * 获取 `profiles` 目录下的对应的 `env` 文件绝对路径
 * @param profileId profile 类型
 * @returns 对应的 `env` 文件绝对路径
 */
const getEnvAbsolutePath: (profileId: string) => string[] = (profileId: string) => {
  // 加载 `profiles` 目录下的对应的 `env` 文件
  const globOptions = { absolute: true };
  return glob.sync(`profiles/${profileId}/**/*.env`, globOptions);
};

/**
 * 获取 `profiles` 目录下的对应的 `env` 文件中包含的所有配置的 `key` 值
 * @param profileId `env` 类型
 * @returns `env` 文件中包含的所有配置的 `key` 值
 */
const getKeys: (dotenvFiles: string|string[]) => (string | ConcatArray<string>)[] = (dotenvFiles: string|string[]) => {
  if (!Array.isArray(dotenvFiles)) {
    dotenvFiles = [dotenvFiles];
  }
  return _.union(_.flattenDeep(dotenvFiles.map((dotenvFile) => {
    const content = readFileSync(dotenvFile, 'utf-8');
    return Object.keys(dotenv.parse(content));
  })));
};

const getMissKeys: (profileId: string) => string[] = (profileId: string) => {
  const profileKeys = getKeys(getEnvAbsolutePath(profileId));
  const defaultKeys = getKeys(getEnvAbsolutePath('default'));
  const easyNodeKeys = getKeys(easyNodeEnvPath);
  const allDefaultKeys = defaultKeys.concat(easyNodeKeys);
  const foundKeys = [];
  profileKeys.forEach((key) => {
    if (!allDefaultKeys.includes(key)) {
      foundKeys.push(key);
    }
  });

  return foundKeys;
};

/**
 * 加载 `profiles` 目录下的对应的 `env` 文件
 * @param profileId
 */
const loadEnv = (profileId: string) => {
  const dotenvFiles = getEnvAbsolutePath(profileId);
  dotenvFiles.forEach((dotenvFile) => {
    console.log(` - ${dotenvFile}`);
    dotenv.config({
      path: dotenvFile
    });
  });
};

// 加载工程根目录下的 `.env` 文件
dotenv.config();

// 不存在 NODE_ENV 时强制退出程序
if (!('NODE_ENV' in process.env)) {
  console.log('[启动失败]未找到必要的环境变量 `NODE_ENV` ，请尝试以下方法：');
  console.log('  * 运行 `npm run env:{NODE_ENV}` 创建 .env 文件');
  console.log('  * 启动程序时加上环境变量 `NODE_ENV={NODE_ENV}`');
  process.exit(1);
}

const { NODE_ENV, PROFILE_ID } = process.env;
const profileId = PROFILE_ID || NODE_ENV;

const errorKeys = getMissKeys(profileId);
if (errorKeys.length === 0) {
  console.log('load profile files:');
  loadEnv(profileId);
  loadEnv('default');

  console.log('load easynode config file:');
  console.log(` - ${easyNodeEnvPath}`);
  dotenv.config({
    path: easyNodeEnvPath
  });
} else {
  const directory = resolve('profiles/default');
  const error = `默认配置${directory}中没找到配置项：'${errorKeys.join(', ')}'`;
  console.log(error);
  process.exit(1);
}
