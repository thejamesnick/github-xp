#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';
import { scanCommand } from './commands/scan.js';
import { skillsCommand } from './commands/skills.js';
import { exportCommand } from './commands/export.js';
import { configSetTokenCommand, configClearCommand, configStatusCommand } from './commands/config.js';

// Read version from package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

const program = new Command();

program
  .name('gh-xp')
  .description(chalk.cyan('Extract GitHub experience into AI-ready data formats'))
  .version(packageJson.version)
  .addHelpText('before', `
${chalk.bold.cyan('GitHub XP')} - Turn your GitHub repos into resume gold ✨

${chalk.gray('Extract project experience from your GitHub profile and output')}
${chalk.gray('structured data (JSON/Markdown) for AI-powered resume generation.')}
`)
  .addHelpText('after', `
${chalk.bold('Examples:')}
  ${chalk.gray('# Scan your GitHub profile')}
  ${chalk.cyan('$ gh-xp scan yourusername')}

  ${chalk.gray('# Show skills inventory')}
  ${chalk.cyan('$ gh-xp skills yourusername')}

  ${chalk.gray('# Export to JSON for AI')}
  ${chalk.cyan('$ gh-xp export yourusername --format json > experience.json')}

  ${chalk.gray('# Export with more projects')}
  ${chalk.cyan('$ gh-xp export yourusername --limit 20 --format markdown')}

  ${chalk.gray('# Set up GitHub token (for private repos & higher rate limits)')}
  ${chalk.cyan('$ gh-xp config set-token ghp_xxxxxxxxxxxx')}

${chalk.bold('Need help?')} ${chalk.blue('https://github.com/thejamesnick/github-xp')}
`);

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
