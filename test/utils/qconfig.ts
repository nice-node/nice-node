import should from 'should';
// import client from '@qnpm/qconfig-client-plus';
import { initQconfig, client } from '../../src/utils/qconfig';

describe.skip('utils/qconfig.ts', () => {
  it('should get config data', async () => {
    await initQconfig({
      enable: true,
      options: {
        name: 'h_flow_node',
        token: 'QZPXiohKrMEYw2iHAaUqoUu5MQ0uehxDaAAiEfzbQ/ijMRGubSkWMfbuYByK3yaWDk3GhdbdwxYviveoChGv/cKRLorLlUtakdONB/uX1PK3tVQAv90a+GfUGqVtr2Ma3tjgHMDpnxiKqXz3em8dK/82vjRCAT2ZSoNHfcyUH/4=',
        properties: ['tipsText.json'],
        logPath: 'logs/qconfig'
      }
    });
    client.getConfig('tipsText.json').get('NoticeTips').noticeTitle.should.equal('公告栏');
  });
});
