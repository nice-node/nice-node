import execa from 'execa';

let cmd: string;

export default () => {
  if (cmd) {
    return cmd;
  }

  try {
    execa.sync('yarnpkg', '--version');
    cmd = 'yarn';
  } catch (e) {
    cmd = 'npm';
  }

  return cmd;
};
