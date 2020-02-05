import execa from 'execa';

let cmd: string;

export default () => {
  if (cmd) {
    return cmd;
  }

  try {
    execa.commandSync('yarn --version');
    // execa.sync('yarn', '--version');
    cmd = 'yarn';
  } catch (e) {
    cmd = 'npm';
  }

  return cmd;
};
