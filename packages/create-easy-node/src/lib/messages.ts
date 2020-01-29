import chalk from 'chalk';
import getInstallCmd from './utils/get-install-cmd';
import { param, error, cmd } from './utils/output';

const program = {
  name: 'create-easy-node',
};

export const help = () => {
  return `
    Only ${chalk.green('<project-directory>')} is required.
    If you have any problems, do not hesitate to file an issue:
      ${chalk.cyan('https://github.com/zhongzhi107/easy-node/issues/new')}
  `;
};

export const exampleHelp = () => {
  return `Example from https://github.com/zhongzhi107/easy-node/tree/master/examples/ ${param(
    'example-path'
  )}`;
};

export const missingProjectName = () => {
  return `
Please specify the project directory:
  ${chalk.cyan(program.name)} ${chalk.green('<project-directory>')}
For example:
  ${chalk.cyan(program.name)} ${chalk.green('my-easy-node')}
  ${chalk.cyan(program.name)} ${chalk.cyan(
    '--example with-preact'
  )} ${chalk.green('my-preact-app')}
Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`;
};

export const alreadyExists = (projectName: string) => {
  return `
Uh oh! Looks like there's already a directory called ${chalk.red(
    projectName
  )}. Please try a different name or delete that folder.`;
};

export const installing = (packages) => {
  const pkgText = packages
    .map(function(pkg) {
      return `    ${chalk.cyan(chalk.bold(pkg))}`;
    })
    .join('\n');

  return `
  Installing npm modules:
${pkgText}
`;
};

export const installError = (packages) => {
  const pkgText = packages
    .map(function(pkg) {
      return `${chalk.cyan(chalk.bold(pkg))}`;
    })
    .join(', ');

  error(`Failed to install ${pkgText}, try again.`);
};

export const copying = (projectName: string) => {
  return `
正在创建 ${chalk.bold(chalk.green(projectName))} ...
`;
};

export const start = (projectName: string) => {
  const installCmd: string = getInstallCmd();

  const commands = {
    install: installCmd === 'npm' ? 'npm install' : 'yarn',
    build: installCmd === 'npm' ? 'npm run build' : 'yarn build',
    start: installCmd === 'npm' ? 'npm run start:prod' : 'yarn start:prod',
    dev: installCmd === 'npm' ? 'npm start' : 'yarn start',
  };

  return `
  ${chalk.green('Awesome!')} You're now ready to start coding.
  
  I already ran ${cmd(commands.install)} for you, so your next steps are:
    ${cmd(`cd ${projectName}`)}
  
  To start a local server for development:
    ${cmd(commands.dev)}
  
  To build a version for production:
    ${cmd(commands.build)}

  To run the server in production:
    ${cmd(commands.start)}
    
  Questions? Feedback? Please let me know!
  ${chalk.green('https://github.com/zhongzhi107/easy-node/issues')}
`;
};
