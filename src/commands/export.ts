import ora from 'ora';
import chalk from 'chalk';
import { GitHubClient } from '../lib/github-client.js';
import { parseSkills } from '../lib/skill-parser.js';
import { generateProjectExperience } from '../lib/experience-gen.js';
import { format } from '../utils/formatters.js';
import type { OutputFormat, ExportData } from '../types/index.js';

export async function exportCommand(
  username: string,
  options: { token?: string; format?: OutputFormat; limit?: number }
) {
  const outputFormat = options.format || 'text';
  const limit = options.limit || 10;
  const spinner = ora(`Generating experience data for ${username}`).start();

  try {
    const client = new GitHubClient(options.token);
    const repos = await client.getRepositories(username);

    spinner.text = 'Analyzing repositories...';

    // Fetch language stats for each repo
    const languageStats = new Map();
    for (const repo of repos) {
      const [owner, repoName] = repo.full_name.split('/');
      if (owner && repoName) {
        const stats = await client.getLanguageStats(owner, repoName);
        languageStats.set(repo.full_name, stats);
      }
    }

    // Generate skills inventory
    const skills = parseSkills(repos, languageStats);

    // Generate project experiences
    const projects = repos
      .filter(repo => languageStats.get(repo.full_name) && Object.keys(languageStats.get(repo.full_name)!).length > 0)
      .slice(0, limit)
      .map(repo => generateProjectExperience(repo, languageStats.get(repo.full_name)!));

    const exportData: ExportData = {
      username,
      scannedAt: new Date().toISOString(),
      skills,
      projects,
    };

    spinner.succeed('Experience data generated');

    const output = format(exportData, outputFormat);
    console.log(output);

  } catch (error: any) {
    spinner.fail('Failed to generate experience data');
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}
