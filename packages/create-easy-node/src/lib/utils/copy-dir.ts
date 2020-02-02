import path from 'path';
import Promise from 'promise';
import { copying, } from '../messages';
import { wait, cmd, success, error } from'./output';
import fs from 'fs';
import fsExtra from 'fs-extra';
import { isBinaryFileSync } from 'isbinaryfile';
import ejs from 'ejs';

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
  const { templatePath, projectPath, templateFiles = [], ...features } = opts;

  console.log(copying(features.projectName));

  return new Promise(function(resolve, reject) {
    const stopCopySpinner = wait('正在拷贝文件...');

    fsExtra.copy(templatePath, projectPath)
      .then(() => {
        templateFiles.forEach((file: string | copyOptions) => {
          if (typeof file === 'string') {}
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
      .then(function() {
        stopCopySpinner();
        success('文件拷贝成功。');
        return this;
      })
      .then(resolve)
      .catch(function(err) {
        console.error(err);
        stopCopySpinner();
        error('文件拷贝失败，请重试。');
        reject(err);
        process.exit(1);
      });
  });
};
