import exec from 'execa';
import Promise from 'promise';
import { wait, cmd, success } from './output';

export default (opts: any) => {
  const projectName = opts.projectName;
  const example = opts.example;
  const cmds = [
    `mkdir -p ${projectName}`,
    `curl https://codeload.github.com/dacejs/dace/tar.gz/master | tar -xz -C ${projectName} --strip=3 dace-master/examples/${example}`,
  ];

  const stopExampleSpinner = wait(
    `Downloading files for ${cmd(example)} example`
  );
  const cmdPromises = cmds.map(function(cmd) {
    return exec.shell(cmd);
  });

  return Promise.all(cmdPromises).then(function() {
    stopExampleSpinner();
    success(
      `Downloaded ${cmd(example)} files for ${cmd(projectName)}`
    );
  });
};
