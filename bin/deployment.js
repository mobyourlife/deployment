#!/usr/bin/env node

'use strict'

const program = require('commander')
const info = require('../package')
const deploy = require('../lib/deploy')

program.version(info.version)

program
  .command('deploy <id>')
  .description('deploy website')
  .action((id) => {
    deploy(id)
  })

program.parse(process.argv)
