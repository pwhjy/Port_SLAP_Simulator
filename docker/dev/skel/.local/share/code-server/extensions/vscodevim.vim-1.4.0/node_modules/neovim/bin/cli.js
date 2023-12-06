#!/usr/bin/env node
const { Host } = require('../lib/host');
const { logger } = require('../lib/utils/logger');
const { spawnSync } = require('child_process');
const semver = require('semver');

// node <current script> <rest of args>
const [, , ...args] = process.argv;

if (args[0] === '--version') {
  // eslint-disable-next-line global-require
  const pkg = require('../package.json');
  // eslint-disable-next-line no-console
  console.log(pkg.version);
  process.exit(0);
}

if (
  process.env.NVIM_NODE_HOST_DEBUG &&
  semver.satisfies(process.version, '>=7.6.0 || >=6.12.0 <7.0.0') &&
  process.execArgv.every(token => token !== '--inspect-brk')
) {
  const childHost = spawnSync(
    process.execPath,
    process.execArgv.concat(['--inspect-brk']).concat(process.argv.slice(1)),
    { stdio: 'inherit' }
  );
  process.exit(childHost.status);
}

try {
  const host = new Host(args);
  host.start({ proc: process });
} catch (err) {
  logger.error(err);
}

process.on('unhandledRejection', (reason, p) => {
  logger.info('Unhandled Rejection at:', p, 'reason:', reason);
});
