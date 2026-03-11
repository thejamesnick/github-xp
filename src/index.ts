#!/usr/bin/env bun
import { Command } from 'commander';
import { scanCommand } from './commands/scan.js';
import { skillsCommand } from './commands/skills.js';
import { exportCommand } from './commands/export.js';
import { configSetTokenCommand, configClearCommand, configStatusCommand } from './commands/config.js';

const program = new Command();

program
  .name('gh-xp')
  .description('Extract GitHub experience into AI-ready data formats')
  .version('1.0.0');

program
  .command('scan')
  .description('List all repositories with detected skills')
  .argument('<username>', 'GitHub username')
  .option('-t, --token <token>', 'GitHub Personal Access Token')
  .action(scanCommand);

program
  .command('skills')
  .description('Show aggregated skills inventory')
  .argument('<username>', 'GitHub username')
  .option('-t, --token <token>', 'GitHub Personal Access Token')
  .option('--include-forks', 'Include forked repositories', false)
  .action(skillsCommand);

program
  .command('export')
  .description('Export experience data for AI consumption')
  .argument('<username>', 'GitHub username')
  .option('-t, --token <token>', 'GitHub Personal Access Token')
  .option('-f, --format <format>', 'Output format: text, json, markdown', 'text')
  .option('-l, --limit <number>', 'Number of projects to include', '10')
  .option('--include-forks', 'Include forked repositories', false)
  .action((username, options) => {
    exportCommand(username, {
      ...options,
      limit: parseInt(options.limit),
    });
  });

const configCmd = program
  .command('config')
  .description('Manage configuration');

configCmd
  .command('set-token')
  .description('Save GitHub Personal Access Token')
  .argument('<token>', 'GitHub PAT')
  .action(configSetTokenCommand);

configCmd
  .command('clear')
  .description('Clear saved GitHub token')
  .action(configClearCommand);

configCmd
  .command('status')
  .description('Check configuration status')
  .action(configStatusCommand);

program.parse();
