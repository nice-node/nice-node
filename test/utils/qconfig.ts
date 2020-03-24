import should from 'should';
import qconfig from '../../src/utils/qconfig';

describe('utils/qconfig.ts', () => {
  it('should create log file', async () => {
    await qconfig();
  });
});
