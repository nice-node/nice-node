#! /usr/bin/env node

const currentNodeVersion = process.versions.node;
const [major] = currentNodeVersion.split('.');

if (Number(major) < 8) {
  console.error(`You are running Node ${currentNodeVersion}.
Create NiceNode App requires Node 8 or higher.
Please update your version of Node.
`);
  process.exit(1);
}

require('./lib/create-nice-node');
