import { readFileSync } from 'fs';
import { join } from 'path';
import log from './log';

const pkgPath = join(__dirname, '../../package.json');
const pkgContent = readFileSync(pkgPath, 'utf-8');
const { version: nodeVersion } = JSON.parse(pkgContent);

log('info', `\nnice-node: ${nodeVersion}\nnode: ${process.versions.node}\nuser-agent: ${process.env.npm_config_user_agent}`);
