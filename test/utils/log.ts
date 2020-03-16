import should from 'should';
import log from '../../src/utils/log';

describe('utils/log.ts', () => {
  it('should create log file', async () => {
    log('info', 'abc');
  });
});
