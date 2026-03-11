import chalk from 'chalk';
import { setGitHubToken, clearGitHubToken, hasGitHubToken } from '../utils/config.js';

export function configSetTokenCommand(token: string) {
  setGitHubToken(token);
  console.log(chalk.green('✓ GitHub token saved successfully'));
  console.log(chalk.gray('\nYou can now access private repositories'));
}

export function configClearCommand() {
  clearGitHubToken();
  console.log(chalk.yellow('✓ GitHub token cleared'));
}

export function configStatusCommand() {
  if (hasGitHubToken()) {
    console.log(chalk.green('✓ GitHub token is configured'));
  } else {
    console.log(chalk.yellow('⚠ No GitHub token configured'));
    console.log(chalk.gray('\nTo access private repositories, set a token:'));
    console.log(chalk.cyan('  gh-xp config set-token <your-token>'));
  }
}
