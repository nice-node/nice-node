import { readFileSync } from 'fs';
import { join } from 'path';
import log from './log';

const pkgPath = join(__dirname, '../../package.json');
const pkgContent = readFileSync(pkgPath, 'utf-8');
const { version: nodeVersion } = JSON.parse(pkgContent);

log(`
nice-node:
 - ${nodeVersion}
node:
 - ${process.versions.node}
user-agent:
 - ${process.env.npm_config_user_agent}
`);
