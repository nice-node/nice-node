import { eraseLine } from 'ansi-escapes';
import chalk from 'chalk';
import ora from 'ora';
import ms from 'ms';

export const info = (msg: string) => {
  console.log(`${chalk.gray('>')} ${msg}`);
};

export const error = (msg: any) => {
  if (msg instanceof Error) {
    msg = msg.message;
  }

  console.error(`${chalk.red('> Error!')} ${msg}`);
};

export const success = (msg: string) => {
  console.log(`${chalk.green('> Success!')} ${msg}`);
};

export const time = () => {
  const start = Date.now();
  return chalk.gray(`[${ms(Date.now() - start)}]`);
};

export const wait = (msg: string) => {
  const spinner = ora(chalk.green(msg));
  spinner.color = 'blue';
  spinner.start();

  return function() {
    spinner.stop();
    process.stdout.write(eraseLine);
  };
};

export const prompt = (opts: any) => {
  return new Promise(function(resolve, reject) {
    opts.forEach(function(val, i) {
      const text = val[1];
      console.log(`${chalk.gray('>')} [${chalk.bold(i + 1)}] ${text}`);
    });

    const ondata = v => {
      const s = v.toString();

      function cleanup() {
        process.stdin.setRawMode(false);
        process.stdin.removeListener('data', ondata);
      }

      if (s === '\u0003') {
        cleanup();
        reject(new Error('Aborted'));
        return;
      }

      const n = Number(s);
      if (opts[n - 1]) {
        cleanup();
        resolve(opts[n - 1][0]);
      }
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', ondata);
  });
};

export const cmd = (cmd: string) => {
  return chalk.bold(chalk.cyan(cmd));
};

export const code = (cmd: string) => {
  return `${chalk.gray('`')}${chalk.bold(cmd)}${chalk.gray('`')}`;
};

export const param = (param: string) => {
  return chalk.bold(`${chalk.gray('{')}${chalk.bold(param)}${chalk.gray('}')}`);
};
