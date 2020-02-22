import path from 'path';
import Promise from 'promise';
import fs from 'fs';
import fsExtra from 'fs-extra';
import ejs from 'ejs';
import { isBinaryFileSync } from 'isbinaryfile';
import { copying } from './messages';
import {
  wait, cmd, success, error
} from './output';

interface copyOptions {
  from: string,
  to: string
}

interface dirOptions {
  templatePath?: string,
  projectPath?: string,
  projectName: string,
  templateFiles?: string[] | copyOptions[]
}

function copyTpl(from: string, to: string, context: any) {
  if (!isBinaryFileSync(from)) {
    const contents = fs.readFileSync(from, 'utf8');
    const result = ejs.render(contents, context);
    // 文件名称也支持 ejs 变量替换
    const newTo = ejs.render(to, context);
    // 删除文件名称替换前的文件
    if (to !== newTo && fs.existsSync(to)) {
      fs.unlinkSync(to);
    }
    fs.writeFileSync(newTo, result);
  }
}

export default (opts: dirOptions) => {
  const {
    templatePath, projectPath, templateFiles = [], ...features
  } = opts;

  console.log(copying(features.projectName));

  return new Promise((resolve, reject) => {
    const stopCopySpinner = wait('Copying files');

    fsExtra.copy(templatePath, projectPath)
      .then(() => {
        templateFiles.forEach((file: string | copyOptions) => {
          const from = typeof file === 'string' ? file : file.from;
          const to = typeof file === 'string' ? file : file.to;
          copyTpl(path.resolve(templatePath, from), path.resolve(projectPath, to), features);
        });
        return this;
        // return fsExtra.move(
        //   path.resolve(projectPath, './gitignore'),
        //   path.resolve(projectPath, './.gitignore')
        // );
      })
      .then(() => {
        stopCopySpinner();
        success(`Created files for ${cmd(features.projectName)}`);
        return this;
      })
      .then(resolve)
      .catch((err) => {
        console.error(err);
        stopCopySpinner();
        error('Copy command failed, try again.');
        reject(err);
        process.exit(1);
      });
  });
};
