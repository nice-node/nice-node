import execa from 'execa';
import Promise from 'promise';
import { installing, installError } from './messages';
import getInstallCmd from './get-install-cmd';
import { wait, success } from './output';

interface installOptions {
  projectName: string,
  projectPath: string,
  packages: string[]
}

function getInstallArgs(cmd: string, packages: string[]) {
  let args: string[];
  if (cmd === 'npm') {
    args = ['install', '--save', '--save-exact', '--registry=https://registry.npm.taobao.org'];
    return args.concat(packages, ['--verbose']);
  }
  args = ['add'];
  return args.concat(packages);
}

export default (opts: installOptions) => {
  const { projectName, projectPath, packages = [] } = opts;

  if (packages.length === 0) {
    console.log('Missing packages in `install`, try running again.');
    process.exit(1);
  }

  const installCmd = getInstallCmd();
  const installArgs = getInstallArgs(installCmd, packages);

  console.log(installing(packages));
  process.chdir(projectPath);

  return new Promise((resolve, reject) => {
    const stopInstallSpinner = wait('Installing modules');

    execa(installCmd, installArgs)
      // .then(() => execa(installCmd, ['install']))
      .then(() => {
        stopInstallSpinner();
        success(`Installed dependencies for ${projectName}`);
        resolve();
      })
      .catch(() => {
        stopInstallSpinner();
        console.log(installError(packages));
        return reject(new Error(`${installCmd} installation failed`));
      });
  });
};
