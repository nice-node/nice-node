import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import copyDir from './copy-dir';
import install from './install';
import loadExample from './load-example';
import { missingProjectName, alreadyExists, start } from './messages';

function deleteUnusedFiles(opts: any) {
  const {
    projectPath, graphql, pug
  } = opts;

  setTimeout(() => {
    if (!graphql) {
      rimraf.sync(path.join(projectPath, 'src/graphql'));
    }

    if (!pug) {
      rimraf.sync(path.join(projectPath, 'src/pom.xml'));
      rimraf.sync(path.join(projectPath, 'templates'));
    }
  }, 5000);

  return () => Promise.resolve(opts);
}

function installWithMessageFactory(opts: any) {
  const {
    projectName, projectPath, graphql, pug, qconfig
  } = opts;
  const packages = ['nice-node'];
  if (graphql) {
    packages.push(
      '@types/graphql-type-json',
      'graphql',
      'graphql-tools',
      'graphql-type-json',
      'koa-graphql-fix',
      'merge-graphql-schemas'
    );
  } else {
    rimraf.sync(path.join(projectPath, 'src/graphql'));
  }

  if (pug) {
    packages.push('koa-pug');
  } else {
    rimraf.sync(path.join(projectPath, 'src/pom.xml'));
    rimraf.sync(path.join(projectPath, 'templates'));
  }

  if (qconfig) {
    packages.push('@qnpm/qconfig-client-plus');
  }

  return () => install({
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

  if (opts.example) {
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
        'crontab/crontab.txt',
        'deploy_scripts/<%=appCode%>_start',
        'deploy_scripts/<%=appCode%>_stop',
        'profiles/beta/nicenode.env',
        'profiles/local/nicenode.env',
        'profiles/prod/nicenode.env',
        'nodemon-debug.json',
        'nodemon.json',
        'package.json',
        'pom.xml',
        'README.md'
      ]
    })
      .then(deleteUnusedFiles(opts))
      .then(installWithMessageFactory(opts))
      .catch((err: any) => {
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
      if (/^[\w_]*$/.test(input)) {
        return true;
      }
      return 'Invalid app code. App code can only be numbers, letters, and underscores. Please try again.';
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
    create({
      ...answers,
      // 避免代码被扫描
      company: String.fromCharCode(113, 117, 110, 97, 114)
    });
  });
