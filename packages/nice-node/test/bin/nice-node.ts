import { fork, ChildProcess } from 'child_process';
import path from 'path';
import should from 'should';
// import niceNode from '../../src/bin/nice-node';

const executablePath = path.resolve(`${__dirname}/../../dist/bin/nice-node.js`);

function awaitExit(exitingProcess) {
  return new Promise((resolve) => exitingProcess.once('exit', resolve));
}

function assertExitCode(exitingProcess, expectedExitCode) {
  return awaitExit(exitingProcess).then((exitCode) => {
    exitCode.should.equal(expectedExitCode);
  });
}

describe('bin/nice-node.ts', () => {
  const forkedProcesses = new Set();

  function runNiceNode(args = [], options = {}) {
    const newProcess = fork(executablePath, args, options);

    forkedProcesses.add(newProcess);
    return newProcess;
  }

  it('aa', () => {
    const child = runNiceNode([], { env: { PROFILE: 'local' } });
    return assertExitCode(child, 0);
  });

  afterEach(() => {
    // Clean up all the processes after every test.
    forkedProcesses.forEach((child: ChildProcess) => (child).kill());
    forkedProcesses.clear();
  });
});
