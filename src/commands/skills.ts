import ora from 'ora';
import chalk from 'chalk';
import { GitHubClient } from '../lib/github-client.js';
import { parseSkills } from '../lib/skill-parser.js';

export async function skillsCommand(username: string, options: { token?: string; includeForks?: boolean }) {
  const includeForks = options.includeForks ?? false;
  const spinner = ora(`Analyzing skills for ${username}`).start();

  try {
    const client = new GitHubClient(options.token);
    let repos = await client.getRepositories(username);

    // Filter out forks unless explicitly included
    if (!includeForks) {
      repos = repos.filter(repo => !repo.fork);
      spinner.text = `Analyzing ${repos.length} original repos (excluding forks)`;
    }

    spinner.text = 'Fetching language statistics...';

    // Fetch language stats for each repo
    const languageStats = new Map();
    for (const repo of repos) {
      const [owner, repoName] = repo.full_name.split('/');
      if (owner && repoName) {
        const stats = await client.getLanguageStats(owner, repoName);
        languageStats.set(repo.full_name, stats);
      }
    }

    const skills = parseSkills(repos, languageStats);

    spinner.succeed('Skills analysis complete');

    console.log(chalk.bold('\n🎯 Skills Inventory:\n'));

    const sortedSkills = Object.entries(skills)
      .sort((a, b) => b[1].projects - a[1].projects);

    for (const [skill, data] of sortedSkills) {
      console.log(chalk.cyan(`  ${skill}`));
      console.log(chalk.gray(`    Projects: ${data.projects}`));
      console.log(chalk.gray(`    Lines of code: ${data.totalLines.toLocaleString()}`));
      console.log(chalk.gray(`    Repos: ${data.repos.slice(0, 3).join(', ')}${data.repos.length > 3 ? '...' : ''}`));
      console.log();
    }

  } catch (error: any) {
    spinner.fail('Failed to analyze skills');
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}
