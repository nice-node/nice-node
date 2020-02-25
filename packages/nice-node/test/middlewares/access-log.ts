import { existsSync } from 'fs';
import { resolve } from 'path';
import rimraf from 'rimraf';
import should from 'should';
import request from 'supertest';
import NiceNode from '../../src/server';

const LOG_ROOT = 'logs';

function deleteDirectory() {
  const root = resolve(LOG_ROOT);
  rimraf.sync(root);
}

describe('middlewares:access-log', () => {
  beforeEach(() => {
    deleteDirectory();
  });

  afterEach(() => {
    deleteDirectory();
  });

  describe('is enable', () => {
    describe('and without logs directory', () => {
      it('should exists logs directory', async () => {
        const root = resolve(LOG_ROOT);
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
    });
  });

  describe('is disable', () => {
    describe('and without logs directory', () => {
      it('should not exists logs directory', async () => {
        const root = resolve(LOG_ROOT);
        const app = new NiceNode({ // eslint-disable-line no-new
          accessLog: {
            enable: false
          }
        });
        await request(app.server.listen())
          .get('/')
          .expect(404);

        existsSync(root).should.be.false();
      });
    });
  });
});
