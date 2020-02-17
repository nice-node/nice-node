import chalk from 'chalk';
import getInstallCmd from './get-install-cmd';
import { param, error, cmd } from './output';

const program = {
  name: 'create-nice-node'
};

export const help = () => `
Only ${chalk.green('<project-directory>')} is required.
If you have any problems, do not hesitate to file an issue:
  ${chalk.cyan('https://github.com/zhongzhi107/nice-node/issues/new')}
`;

export const exampleHelp = () => `Example from https://github.com/zhongzhi107/nice-node/tree/master/examples/ ${param(
  'example-path'
)}`;

export const missingProjectName = () => `
Please specify the project directory:
  ${chalk.cyan(program.name)} ${chalk.green('<project-directory>')}
For example:
  ${chalk.cyan(program.name)} ${chalk.green('my-nice-node')}
  ${chalk.cyan(program.name)} ${chalk.cyan('--example with-graphql')} ${chalk.green('my-preact-app')}
Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`;

export const alreadyExists = (projectName: string) => `
Uh oh! Looks like there's already a directory called ${chalk.red(projectName)}. Please try a different name or delete that folder.`;

export const installing = (packages: any[]) => {
  const pkgText = packages
    .map((pkg) => `    ${chalk.cyan(chalk.bold(pkg))}`)
    .join('\n');

  return `
  Installing npm modules:
${pkgText}
`;
};

export const installError = (packages) => {
  const pkgText = packages
    .map((pkg: string) => `${chalk.cyan(chalk.bold(pkg))}`)
    .join(', ');

  error(`Failed to install ${pkgText}, try again.`);
};

export const copying = (projectName: string) => `
Creating ${chalk.bold(chalk.green(projectName))}...
`;

export const start = (projectName: string) => {
  const installCmd: string = getInstallCmd();

  const commands = {
    install: installCmd === 'npm' ? 'npm install' : 'yarn',
    build: installCmd === 'npm' ? 'npm run build' : 'yarn build',
    start: installCmd === 'npm' ? 'npm run start:prod' : 'yarn start:prod',
    dev: installCmd === 'npm' ? 'npm start' : 'yarn start',
    lint: installCmd === 'npm' ? 'npm run lint' : 'yarn lint'
  };

  return `
  ${chalk.green('Awesome!')} You're now ready to start coding.
  
  I already ran ${cmd(commands.install)} for you, so your next steps are:
    ${cmd(`cd ${projectName}`)}
  
  To start a local server for development:
    ${cmd(commands.dev)}
  
  To build a version for production:
    ${cmd(commands.build)}

  To run compiled project code:
    ${cmd(commands.start)}
    
  To run code lint:
    ${cmd(commands.lint)}
    
  Questions? Feedback? Please let me know!
  ${chalk.green('https://github.com/zhongzhi107/nice-node/issues')}
`;
};
