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
import dotenvDiff from './dotenv-diff';
import log from './log';

let appEnv = {};

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
    const relativePath = dotenvFile.replace(process.cwd(), '');
    const config = dotenv.config({
      path: dotenvFile
    }).parsed;
    const invalidKeys = Object.keys(config).filter((key) => !/^[0-9A-Z_]*$/.test(key))
    if (invalidKeys.length === 0) {
      log(` - ${relativePath}`);
      if (relativePath === `/profiles/${profileId}/nicenode.env`) {
        appEnv = config;
      }
    } else {
      log(`\n\n[error] Invalid key name in ${relativePath}: "${invalidKeys}"`);
      log('The key name must consist of numbers, uppercase letters, and underscores');
      process.exit(1);
    }
  });
};

// 加载工程根目录下的 `.env` 文件
dotenv.config();

const { PROFILE } = process.env;

// 不存在 PROFILE 时强制退出程序
if (!PROFILE) {
  log('[启动失败]未找到必要的环境变量 `PROFILE` ，请尝试以下方法：');
  log(' - 运行 `echo "PROFILE=local">.env` 创建 .env 文件');
  log(' - 启动程序时加上环境变量 `PROFILE=local`');
  process.exit(1);
}

log('\nload profile files:');
loadEnv(PROFILE);

const niceNodeEnvPath = resolve(__dirname, '../../nicenode.env');
log('\nload nice-node config file:');
log(` - ${niceNodeEnvPath.replace(process.cwd(), '')}`);
const niceNodeEnv = dotenv.config({
  path: niceNodeEnvPath
}).parsed;

// 检查 nicenode.env 的 key 是否合法
const invalidKeys = Object.keys(appEnv).filter((key) => !(key in niceNodeEnv));
if (invalidKeys.length > 0) {
  log(`\n\n[error] Invalid key in /profiles/${PROFILE}/nicenode.env: "${invalidKeys.join(', ')}"`);
  log('The key is not the default configuration key for nice-node');
  process.exit(1);
}

const diffTable = dotenvDiff();
log(`\nprofiles diff result:\n${diffTable}`);
