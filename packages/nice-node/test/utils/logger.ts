import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import should from 'should';
import { format as dateFormat } from 'date-fns';
import logger from '../../src/utils/logger';

describe('utils/logger.ts', () => {
  const { LOG_ROOT, LOG_FILE_DATE_PATTERN } = process.env;
  const pattern = LOG_FILE_DATE_PATTERN
    .replace('YYYY', 'yyyy')
    .replace('DD', 'dd');
  const filename = 'combined.%DATE%.log'
    .replace('%DATE%', dateFormat(new Date(), pattern));
  const filepath = resolve(LOG_ROOT, filename);

  const message = 'abc';
  const loggerType = 'info';

  logger[loggerType](message);

  logger.info(new Error('error'));

  it('should create log file', async () => {
    existsSync(filepath).should.be.true();
  });

  it('should write log message', async () => {
    const content = readFileSync(filepath, 'utf-8');
    new RegExp(`${loggerType}: ${message}\n`, 'g').test(content).should.be.true();
  });

  it('should write error stack', async () => {
    const content = readFileSync(filepath, 'utf-8');
    new RegExp('StackTrace: Error: error', 'g').test(content).should.be.true();
  });
});
