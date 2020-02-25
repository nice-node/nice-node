import { writeFileSync, unlinkSync } from 'fs';
import { resolve } from 'path';
import request from 'supertest';
import NiceNode from '../../src/server';

function createFile() {
  const { HEALTH_CHECK_ENDPOINT } = process.env;
  const endpoint = resolve(HEALTH_CHECK_ENDPOINT.substr(1, HEALTH_CHECK_ENDPOINT.length));
  writeFileSync(endpoint, '');
}

function deleteFile() {
  const { HEALTH_CHECK_ENDPOINT } = process.env;
  const endpoint = resolve(HEALTH_CHECK_ENDPOINT.substr(1, HEALTH_CHECK_ENDPOINT.length));
  unlinkSync(resolve(endpoint));
}

describe('middlewares:health-check', () => {
  describe('is enable', () => {
    describe('and with healthcheck.html', () => {
      before(() => {
        createFile();
      });

      after(() => {
        deleteFile();
      });

      it('should return status=200', async () => {
        const { HEALTH_CHECK_ENDPOINT } = process.env;
        const app = new NiceNode();
        await request(app.server.listen())
          .get(HEALTH_CHECK_ENDPOINT)
          .expect(200);
      });
    });

    describe('and without healthcheck.html', () => {
      it('should return status=404', async () => {
        const { HEALTH_CHECK_ENDPOINT } = process.env;
        const app = new NiceNode();
        await request(app.server.listen())
          .get(HEALTH_CHECK_ENDPOINT)
          .expect(404);
      });
    });
  });

  describe('is disable', () => {
    describe('and with healthcheck.html', () => {
      before(() => {
        createFile();
      });

      after(() => {
        deleteFile();
      });

      it('should return status=404', async () => {
        const { HEALTH_CHECK_ENDPOINT } = process.env;
        const app = new NiceNode({
          healthCheck: {
            enable: false
          }
        });
        await request(app.server.listen())
          .get(HEALTH_CHECK_ENDPOINT)
          .expect(404);
      });
    });

    describe('and without healthcheck.html', () => {
      it('should return status=404', async () => {
        const { HEALTH_CHECK_ENDPOINT } = process.env;
        const app = new NiceNode({
          healthCheck: {
            enable: false
          }
        });
        await request(app.server.listen())
          .get(HEALTH_CHECK_ENDPOINT)
          .expect(404);
      });
    });
  });

});
