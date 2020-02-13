#!/usr/bin/env node

/**
 * 该文件可能在 portal 编译机上执行，也可能在本地运行。
 */
const { writeFileSync } = require('fs');
const { resolve } = require('path');

function log(...args: any) {
  args.unshift('[nice-node]');
  console.log.apply(null, args);
}

function help(command?: string) {
  if (command) {
    switch (command) {
      case 'build':
        console.log(`
nice-node build (with no args)
`);
      break;
      default:
        console.log(`nice-node: \'${command}\' is not a nice-node command. See 'nice-node --help'.`);
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
  const { profile, PROFILE, deploy_type, NODE_ENV } = process.env;
  const profileId = profile || PROFILE;

  if (!profileId) {
    log(`Missing environment variable \`PROFILE\`, build failed.`);
    process.exit(1);
  }

  // 建立 deploy_type 和 NODE_ENV 的映射关系
  // （备用）通常习惯使用 NODE_ENV 来判断环境类型
  let nodeEnv = NODE_ENV; // 优先使用环境变量中的 NODE_ENV
  if (!nodeEnv) {
    switch (deploy_type) {
      case 'prepare': // 灰度环境也是线上环境
      case 'prod':
        nodeEnv = 'production';
        break;
      case 'dev':
        nodeEnv = 'development';
      default:
        nodeEnv = 'local'; // 默认当作本地环境
    }
  }

  const content = `PROFILE=${profileId}\nNODE_ENV=${nodeEnv}`;
  log(content);

  try {
    writeFileSync(dotenvPath, content);
  } catch (error) {
    log(`Failed to create ${dotenvPath}.\n${error}`);
    process.exit(1);
  }

  log(`${dotenvPath} was created.`);
}

function build() {
  createDotenv();
  require('typescript/lib/tsc.js');
}

const args = process.argv.splice(2);
// 默认执行 build 命令
const [command = 'build', commandArgs] = args;

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

