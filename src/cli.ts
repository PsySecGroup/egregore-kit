#!/bin/bash

import { Command } from 'commander'
import { getPipeAsArray } from './pipe'

const { name, description, version } = require('../package.json')

const program = new Command()

program
  .name(name)
  .description(description)
  .version(version)

program.command('split')
  .description('')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((arg, { first, separator }) => {
    const limit = first ? 1 : undefined;
    console.log(arg.split(separator, limit));
  })

async function main () {
  await getPipeAsArray(async (chunk: string[]) => {
    console.log(chunk)
  })

  program.parse()
}

main()


