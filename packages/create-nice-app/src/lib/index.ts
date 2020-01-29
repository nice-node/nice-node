import path from 'path';
import fs from 'fs';
import copyDir from './utils/copy-dir';
import install from './utils/install';
import loadExample from './utils/load-example';
import { missingProjectName, alreadyExists, start } from './messages';

interface createNiceAppOptions {
  projectName?: string,
  projectPath?: string,
  example?: string
}

export default (opts: createNiceAppOptions) => {
  const projectName = opts.projectName;

  if (!projectName) {
    console.log(missingProjectName());
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log(alreadyExists(projectName));
    process.exit(1);
  }

  const projectPath = (opts.projectPath = process.cwd() + '/' + projectName);

  if (opts.example !== '') {
    loadExample({
      projectName: projectName,
      example: opts.example,
    }).then(installWithMessageFactory(opts));
  } else {
    const templatePath = path.resolve(__dirname, '../../templates');

    copyDir({
      templatePath: templatePath,
      projectPath: projectPath,
      projectName: projectName,
      templateFiles: [
        'README.md',
        'package.json',
        'crontab/crontab.txt',
        'crontab/deleteLogs.sh',
        'deploy_scripts/<%=appCode%>_start',
        'deploy_scripts/<%=appCode%>_stop'
      ]
    })
      .then(installWithMessageFactory(opts))
      .catch(function(err) {
        throw err;
      });
  }
};

function installWithMessageFactory(opts: createNiceAppOptions) {
  const projectName = opts.projectName;
  const projectPath = opts.projectPath;

  return function installWithMessage() {
    return install({
      projectName: projectName,
      projectPath: projectPath,
      packages: ['nice'],
    })
      .then(function() {
        console.log(start(projectName));
      })
      .catch(function(err) {
        throw err;
      });
  };
}
