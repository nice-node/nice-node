import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import rimraf from 'rimraf';
import should from 'should';
import request from 'supertest';
import { format as dateFnsFormat } from 'date-fns';
import NiceNode from '../../src/server';

const LOG_ROOT = 'test/fixtures/logs';
const { ACCESS_LOG_FILENAME, ACCESS_LOG_FILENAME_DATEFORMAT } = process.env;
const dateFormat = ACCESS_LOG_FILENAME_DATEFORMAT.replace('YYYY', 'yyyy').replace('DD', 'dd');
const filename = `${LOG_ROOT}/${ACCESS_LOG_FILENAME.replace('%DATE%', dateFnsFormat(new Date(), dateFormat))}`;

function deleteAccessLog() {
  rimraf.sync(LOG_ROOT);
}

describe('middlewares/access-log.ts', () => {
  beforeEach(() => {
    deleteAccessLog();
  });

  afterEach(() => {
    deleteAccessLog();
  });

  describe('is enable', () => {
    it('should create log directory', async () => {
      rimraf.sync(resolve(LOG_ROOT));
      new NiceNode({ // eslint-disable-line no-new
        accessLog: {
          enable: true,
          options: {
            root: LOG_ROOT
          }
        }
      });
      existsSync(resolve(LOG_ROOT)).should.be.true();
    });

    it('should create log file', async () => {
      const app = new NiceNode({
        accessLog: {
          enable: true,
          options: {
            root: LOG_ROOT
          }
        }
      });
      await request(app.server.listen())
        .get('/')
        .expect(404);
      existsSync(resolve(filename)).should.be.true();

      const pattern = /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\] "GET \/ HTTP\/1\.1" 404 9 - \d{1,2}.\d{3} ms "-" "node-superagent\/3\.8\.3"/
      const content = readFileSync(resolve(filename), 'utf-8');
      pattern.test(content).should.be.true();
    });
  });

  describe('is disable', () => {
    it('should not create log file', async () => {
      const app = new NiceNode({
        accessLog: {
          enable: false
        }
      });
      await request(app.server.listen())
        .get('/')
        .expect(404);

      existsSync(filename).should.be.false();
    });
  });
});
