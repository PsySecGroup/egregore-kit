#!/bin/bash

import { Command } from 'commander'

const { name, description, version } = require('../package.json')

const program = new Command()

program
  .name(name)
  .description(description)
  .version(version)

program.command('update')
  .description('Updates a report')
  .argument('<name>', 'Identifier of the report to update')
  .argument('<endpoints>', 'Path or URL of endpoint schema JSON')
  .argument('[source]', 'Path or URL of HTTP endpoint data.  If empty, data via Linux piping will be expected.')
  .action(async (name: string, endpoints: string, source: string) => {
    // @TODO
    console.log(name, source)   
  })

/*
program.command('split')
  .description('')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((arg, { first, separator }) => {
    const limit = first ? 1 : undefined;
    console.log(arg.split(separator, limit));
  })
*/

async function main () {
  program.parse()
}

main()


