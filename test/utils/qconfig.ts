import should from 'should';
import client from '@qnpm/qconfig-client-plus';
import qconfig from '../../src/utils/qconfig';

describe('utils/qconfig.ts', () => {
  it.skip('should get config data', async () => {
    await qconfig({
      enable: true,
      options: {
        name: '',
        token: '',
        properties: ['tipsText.json'],
        logPath: 'logs/qconfig'
      }
    });
    client.getConfig('tipsText.json').get('NoticeTips').noticeTitle.should.equal('公告栏');
  });
});
