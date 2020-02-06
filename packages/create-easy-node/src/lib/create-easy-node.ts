import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import copyDir from './copy-dir';
import install from './install';
import loadExample from './load-example';
import { missingProjectName, alreadyExists, start } from './messages';

function installWithMessageFactory(opts: any) {
  const {
    projectName, projectPath, graphql, pug, qconfig
  } = opts;
  const packages = ['arg'];
  if (graphql) {
    packages.push(
      // 'easy-node',
      '@types/graphql-type-json',
      'graphql',
      'graphql-tools',
      'graphql-type-json',
      'koa-graphql-fix',
      'merge-graphql-schemas'
    );
  }

  if (pug) {
    packages.push('koa-pug');
  }

  if (qconfig) {
    packages.push('@qnpm/qconfig-client-plus');
  }

  return function installWithMessage() {
    return install({
      projectName,
      projectPath,
      packages
    })
      .then(() => {
        console.log(start(projectName));
      })
      .catch((err) => {
        throw err;
      });
  };
}

function create(opts: any) {
  const { projectName } = opts;

  if (!projectName) {
    console.log(missingProjectName());
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log(alreadyExists(projectName));
    process.exit(1);
  }

  opts.projectPath = `${process.cwd()}/${projectName}`;

  if (opts.example !== '') {
    loadExample({
      projectName,
      example: opts.example
    }).then(installWithMessageFactory(opts));
  } else {
    const templatePath = path.resolve(__dirname, '../../template');

    copyDir({
      ...opts,
      templatePath,
      projectPath: opts.projectPath,
      templateFiles: [
        'README.md',
        'package.json',
        'profiles/default/app.env',
        'crontab/crontab.txt',
        'crontab/deleteLogs.sh',
        'deploy_scripts/<%=appCode%>_start',
        'deploy_scripts/<%=appCode%>_stop'
      ]
    })
      .then(installWithMessageFactory(opts))
      .catch((err) => {
        throw err;
      });
  }
}

const prompts = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the project name?'
  },
  {
    type: 'input',
    name: 'appCode',
    message: 'What is the app code?',
    default: (answers: any) => answers.projectName,
    validate: (input: string) => {
      console.log(input);
      if (/^[\w_]*$/.test(input)) {
        return true;
      }
      return 'Invalid appCode. Please enter letters, numbers and underscores.';
    }
  },
  // {
  //   type: 'list',
  //   name: 'example',
  //   message: '从以下哪个例子中复制',
  //   choices: [
  //     {
  //       name: 'none',
  //       value: ''
  //     },
  //     {
  //       name: 'basic',
  //       value: 'basic'
  //     }
  //   ]
  // },
  {
    type: 'confirm',
    name: 'graphql',
    message: 'Use graphql?',
    default: false
  },
  {
    type: 'confirm',
    name: 'pug',
    message: 'Use pug template?',
    default: false
  },
  {
    type: 'confirm',
    name: 'qconfig',
    message: 'Use qconfig?',
    default: false
  }
];

inquirer
  .prompt(prompts)
  .then((answers: any) => {
    create(answers);
  });
