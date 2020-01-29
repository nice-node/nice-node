import execa from 'execa';
import Promise from 'promise';
import { installing, installError } from '../messages';
import getInstallCmd from './get-install-cmd';
import { wait, success } from './output';

interface installOptions {
  projectName: string,
  projectPath: string,
  packages: string[]
}

export default (opts: installOptions) => {
  const projectName: string = opts.projectName;
  const projectPath: string = opts.projectPath;
  const packages: string[] = opts.packages || [];

  if (packages.length === 0) {
    console.log('Missing packages in `install`, try running again.');
    process.exit(1);
  }

  const installCmd = getInstallCmd();
  const installArgs = getInstallArgs(installCmd, packages);

  console.log(installing(packages));
  process.chdir(projectPath);

  return new Promise(function(resolve, reject) {
    const stopInstallSpinner = wait('Installing modules');

    execa(installCmd, installArgs)
      .then(function() {
        // Confirm that all dependencies were installed
        return execa(installCmd, ['install']);
      })
      .then(function() {
        stopInstallSpinner();
        success(`Installed dependencies for ${projectName}`);
        resolve();
      })
      .catch(function() {
        stopInstallSpinner();
        console.log(installError(packages));
        return reject(new Error(`${installCmd} installation failed`));
      });
  });
};

function getInstallArgs(cmd: string, packages: string[]) {
  if (cmd === 'npm') {
    const args = ['install', '--save', '--save-exact', '--registry=https://registry.npm.taobao.org'];
    return args.concat(packages, ['--verbose']);
  } else if (cmd === 'yarn') {
    const args = ['add'];
    return args.concat(packages);
  }
}
