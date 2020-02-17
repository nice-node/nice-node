import { readFileSync } from 'fs';
import { join  } from 'path';

const pkgPath = join(__dirname, '../../package.json');
const pkgContent = readFileSync(pkgPath, 'utf-8');
const { version: nodeVersion } = JSON.parse(pkgContent);

console.log(`
nice-node:
 - ${nodeVersion}
node:
 - ${process.versions.node}
user-agent: 
 - ${process.env.npm_config_user_agent}
`);
