#! /usr/bin/env node

import createEasyTs from '../lib';
import inquirer from 'inquirer';

const prompts = [
  {
    type: 'input',
    name: 'projectName',
    message: '请输入项目名称'
  },
  {
    type: 'input',
    name: 'appCode',
    message: '请输入appCode',
    default: (answers: any) => answers.projectName
  },
  {
    type: 'list',
    name: 'example',
    message: '从以下哪个例子中复制',
    choices: [
      {
        name: 'none',
        value: ''
      },
      {
        name: 'basic',
        value: 'basic'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'graphql',
    message: '使用 graphql 吗？',
    default: true
  }
];

inquirer
  .prompt(prompts)
  .then((answers: any) => {
    createEasyTs(answers);
  });
