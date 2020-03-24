#!/usr/bin/env node

/**
 * 该文件可能在 portal 编译机上执行，也可能在本地运行。
 */
import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { hostname } from 'os';
import rimraf from 'rimraf';
import parser from 'file-ignore-parser';
import log from 'npmlog';
import { execSync } from 'child_process';

function help(command?: string) {
  if (command) {
    switch (command) {
      case 'build':
        console.log('\nnice-node build (with no args)\n');
        break;
      default:
        console.log(`nice-node: '${command}' is not a nice-node command. See 'nice-node --help'.`);
    }
  } else {
    console.log(`
Usage: nice-node <command>

where <command> is one of:
    build

nice-node <command> -h  quick help on <command>
`);
  }
}

function createDotenv() {
  const dotenvPath = resolve('.env');
  const {
    profile,
    PROFILE,
    deploy_type: deployType,
    NODE_ENV
  } = process.env;
  const profileId = profile || PROFILE;

  log.info('nice-node', 'process.env=%o', process.env);

  if (!profileId) {
    log.error('nice-node', 'Missing environment variable `PROFILE`, build failed.');
    process.exit(1);
  }

  // 建立 deploy_type 和 NODE_ENV 的映射关系
  // （备用）通常习惯使用 NODE_ENV 来判断环境类型
  let nodeEnv = NODE_ENV; // 优先使用环境变量中的 NODE_ENV
  if (!nodeEnv) {
    switch (deployType) {
      case 'prepare': // 灰度环境也是线上环境
      case 'prod':
        nodeEnv = 'production';
        break;
      case 'beta':
        nodeEnv = 'beta';
        break;
      case 'dev':
        nodeEnv = 'development';
        break;
      default:
        nodeEnv = 'local'; // 默认当作本地环境
    }
  }

  const content = `PROFILE=${profileId}\nNODE_ENV=${nodeEnv}`;
  log.info('nice-node', content);

  log.info('nice-node', 'creating dotenv...');
  try {
    writeFileSync(dotenvPath, content);
    log.info('nice-node', `${dotenvPath} was created.`);
  } catch (error) {
    log.error('nice-node', `Failed to create ${dotenvPath}.\n${error}`);
    process.exit(1);
  }
}

function cleanDist() {
  log.info('nice-node', 'deleting dist...');
  rimraf.sync('dist');
  log.info('nice-node', 'deleted dist');
}

async function deleteSourceFiles() {
  // 若关联了前端工程，则 pom.xml 不能删除，否则不会执行 maven 关联
  const protectedFiles: string[] = ['pom.xml'];

  let syncignore: string = '.syncignore';
  if (!existsSync(syncignore)) {
    syncignore = `node_modules/nice-node/${syncignore}`;
  }

  const patterns: Set<string> = await parser(syncignore);
  patterns
    .forEach((pattern: string) => {
      // 处理首尾的空格
      pattern = pattern.trim();
      // 兼容 / 开头的配置
      if (pattern.startsWith('/')) {
        pattern = pattern.substring(1, pattern.length);
      }
      if (!protectedFiles.includes(pattern)) {
        log.info('nice-node', ` - ${pattern}`);
        rimraf.sync(pattern);
      } else {
        log.warn('nice-node', ` - ${pattern}(skipped)`);
      }
    });

  return 'source files deleted.';
}

function prebuild() {
  createDotenv();
  cleanDist();
}

function postbuild() {
  // 只在编译机上删除源代码
  // 编译机的 hostname 如 l-compile5.cm.cn2
  const isComplie: boolean = /\.cm\.cn/.test(hostname());
  if (isComplie) {
    log.info('nice-node', 'deleting source files...');
    deleteSourceFiles().then((message: string) => {
      log.info('nice-node', message);
    }).catch(console.error);
  } else {
    log.warn('nice-node', 'local machine, deleteSourceFiles() skipped.');
  }
}

function build() {
  prebuild();

  log.info('nice-node', 'tsc building...');
  const now = Date.now();
  try {
    execSync('node_modules/.bin/tsc');
  } catch (err) {
    log.error('nice-node', 'tsc build failed.');
    process.exit(1);
  }

  const usedTime: number = (Date.now() - now) / 1000;

  log.info('nice-node', `tsc build succeeded, it took ${String(usedTime)} seconds.`);

  postbuild();
}

const args = process.argv.splice(2);
// 默认执行 build 命令
const [command = 'build', commandArgs] = args;

if (process.env.PROFILE !== 'local') {
  log.disableColor();
}

if (commandArgs === '-h') {
  help(command);
} else {
  switch (command) {
    case 'build':
      build();
      break;
    default:
      help();
  }
}
