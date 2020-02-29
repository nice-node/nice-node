import { existsSync } from 'fs';
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

describe('middlewares:access-log', () => {
  beforeEach(() => {
    deleteAccessLog();
  });

  afterEach(() => {
    deleteAccessLog();
  });

  describe('is enable', () => {
    it('should create log directory', async () => {
      const root = resolve(LOG_ROOT);
      rimraf.sync(LOG_ROOT);
      new NiceNode({ // eslint-disable-line no-new
        accessLog: {
          enable: true,
          options: {
            root
          }
        }
      });
      existsSync(root).should.be.true();
    });

    it('should create log', async () => {
      const root = resolve(LOG_ROOT);
      const app = new NiceNode({
        accessLog: {
          enable: true,
          options: {
            root
          }
        }
      });
      await request(app.server.listen())
        .get('/')
        .expect(404);
      existsSync(filename).should.be.true();
    });
  });

  describe('is disable', () => {
    it('should not create log', async () => {
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
