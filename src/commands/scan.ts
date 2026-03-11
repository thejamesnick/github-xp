import ora from 'ora';
import chalk from 'chalk';
import { GitHubClient } from '../lib/github-client.js';

export async function scanCommand(username: string, options: { token?: string }) {
  const spinner = ora(`Scanning GitHub profile: ${username}`).start();

  try {
    const client = new GitHubClient(options.token);
    const repos = await client.getRepositories(username);

    spinner.succeed(`Found ${repos.length} repositories`);

    console.log(chalk.bold('\n📦 Repositories:\n'));

    for (const repo of repos.slice(0, 20)) {
      console.log(chalk.cyan(`  ${repo.name}`));
      if (repo.description) {
        console.log(chalk.gray(`    ${repo.description}`));
      }
      if (repo.language) {
        console.log(chalk.yellow(`    Language: ${repo.language}`));
      }
      console.log(chalk.gray(`    ⭐ ${repo.stargazers_count} | 🔱 ${repo.forks_count}`));
      console.log();
    }

    if (repos.length > 20) {
      console.log(chalk.gray(`  ... and ${repos.length - 20} more repositories\n`));
    }

    // Show rate limit
    const rateLimit = await client.getRateLimit();
    console.log(chalk.gray(`\nAPI Rate Limit: ${rateLimit.remaining}/${rateLimit.limit} remaining`));

  } catch (error: any) {
    spinner.fail('Failed to scan repositories');
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}
