import exec from 'execa';
import Promise from 'promise';
import { wait, cmd, success } from './output';

export default (opts: any) => {
  const { projectName, example } = opts;
  const cmds = [
    `mkdir -p ${projectName}`,
    `curl https://codeload.github.com/zhongzhi107/nice-node/tar.gz/master | tar -xz -C ${projectName} --strip=3 dace-master/examples/${example}`
  ];

  const stopExampleSpinner = wait(
    `Downloading files for ${cmd(example)} example`
  );
  const cmdPromises = cmds.map((command) => exec.command(command, { shell: true }));

  return Promise.all(cmdPromises).then(() => {
    stopExampleSpinner();
    success(
      `Downloaded ${cmd(example)} files for ${cmd(projectName)}`
    );
  });
};
