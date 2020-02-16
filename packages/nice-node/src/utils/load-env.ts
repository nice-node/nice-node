/**
 * 工程启动时加载 dotenv 中的环境变量，尽早引用该文件，以便后续的代码中能获取到环境变量。
 * 注意：
 * 1. 该文件不能引用 debug ，否则会导致 process.env.DEBUG 设置无效
 * 2. 该文件不能引用 utils(或者引用 debug 的第三方包)
 */
// import { readFileSync } from 'fs';
import { resolve } from 'path';
import dotenv from 'dotenv';
import glob from 'glob';

const easyNodeEnvPath = resolve(__dirname, '../../nicenode.env');

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
 * 加载 `profiles` 目录下的对应的 `env` 文件
 * @param profileId
 */
const loadEnv = (profileId: string) => {
  const dotenvFiles = getEnvAbsolutePath(profileId);
  dotenvFiles.forEach((dotenvFile) => {
    console.log(` - ${dotenvFile.replace(process.cwd(), '')}`);
    dotenv.config({
      path: dotenvFile
    });
  });
};

// 加载工程根目录下的 `.env` 文件
dotenv.config();

const { PROFILE } = process.env;

// 不存在 PROFILE 时强制退出程序
if (!PROFILE) {
  console.log('[启动失败]未找到必要的环境变量 `PROFILE` ，请尝试以下方法：');
  console.log(' - 运行 `echo "PROFILE=local">.env` 创建 .env 文件');
  console.log(' - 启动程序时加上环境变量 `PROFILE=local`');
  process.exit(1);
}

console.log('\nload profile files:');
loadEnv(PROFILE);
loadEnv('default');

console.log('\nload easynode config file:');
console.log(` - ${easyNodeEnvPath.replace(process.cwd(), '')}`);
dotenv.config({
  path: easyNodeEnvPath
});
